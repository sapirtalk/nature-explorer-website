

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminNav from "@/components/admin/AdminNav";
import { cookies } from 'next/headers';
import AdminTrails from "@/components/admin/AdminTrails";
import AdminTours from "@/components/admin/AdminTours";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminContact from "@/components/admin/AdminContact";
import AdminComments from "@/components/admin/AdminComments";
import AdminUsers from "@/components/admin/AdminUsers";
import { connectToDatabase } from "../api/middleware/mongo";


const AdminPanel = async () => {
    
    const websiteData = await getWebsiteData();

  const view = async () => {
    if (cookies().has('admin_user')) {
      const admin = cookies().get('admin_user').value ? JSON.parse(cookies().get('admin_user').value) : emptyAdmin
      return (
        <div className="flex flex-col w-[100%] h-[100vh] justify-center items-center">
            <div className="flex flex-row-reverse w-full h-[90%]">
                <div className="w-[15%] h-full p-3 pl-0 pb-0">       
                    <AdminNav viewNav={setView} curNav={cookies().get('viewNav')} logoutCallback={logout} admin={admin} />
                </div> 
                <div className="w-[85%] h-full p-3">
                    {selectComponent(websiteData)}
                </div>
            </div>
            <div className="w-full border-t-2 border-secondary h-[10%]">
                <AdminFooter />
            </div>  
        </div>
      );
    } else {
      return (
        <AdminLogin loginCallback={login} />
      );
    }
  };

  return (
    <div>
      {view()}
    </div>
  );
};

export default AdminPanel;


// retrive all data from database
const getWebsiteData = async () => {
    const db = await connectToDatabase();
    const database = db

    // Get a list of all collections
    const collections = await database.listCollections().toArray();

    // Create an object to hold the data
    const websiteData = {};
    const Statistics = {};

    // Iterate over each collection and fetch its documents
    for (const collection of collections) {
        const collectionName = collection.name;
        const documents = await database.collection(collectionName).find().toArray();
        websiteData[collectionName] = documents;
    }

    Statistics.numOfUsers = websiteData.Users.length
    Statistics.numOfTrails = websiteData.Trails.length
    Statistics.numOfArticles = websiteData.Articles.length
    Statistics.numOfTours = websiteData.Tours.length
    Statistics.user_traffic = await getUserTraffic(database)
    Statistics.count_by_trail_diff = await getDataCountByTrailDiff(database)
    // Statistics.trail_rating_vs_comments = await getTrailRatingVsComments(database)
    Statistics.user_engagement = await getUserEngagement(database)


    websiteData.Statistics = Statistics

    




    return websiteData;
};


const setView = async (view) => {
    'use server'
    cookies().set('viewNav', view)
}



const selectComponent = async (websiteData) => {
    'use server'

    const viewNavCurrent = cookies().get('viewNav')
    console.log('viewNavCurrent', viewNavCurrent)
    const admin = cookies().get('admin_user').value ? JSON.parse(cookies().get('admin_user').value) : emptyAdmin
    const viewNav = viewNavCurrent ? viewNavCurrent.value : 'dashboard'



    switch (viewNav) {
        case 'dashboard':
            return <AdminDashboard admin={admin} Statistics={websiteData.Statistics} />
        case 'trails':
            return <AdminTrails admin={admin} trailsData={JSON.parse(JSON.stringify(websiteData.Trails))} />
        case 'tours':      
            return <AdminTours admin={admin} />
        case 'articles':       
            return <AdminArticles admin={admin} />
        case 'about': 
            return <AdminAbout admin={admin} />
        case 'contact':
            return <AdminContact admin={admin} />
        case 'comments':
            return <AdminComments admin={admin} />
        case 'users':
            return <AdminUsers adminId={admin.id} UsersData={JSON.parse(JSON.stringify(websiteData.Users))} />
        default:
            return <AdminDashboard admin={admin} Statistics={websiteData.Statistics}/>
    }
}




const login = async (admin) => {
    'use server'
     cookies().set('admin_user', JSON.stringify(admin))
 };

 const logout = async () => {
     'use server'
     cookies().delete('admin_user')
 };



const emptyAdmin = {
    firstName: '',
    lastName: '',
    email: '',
}



// this async function gets the user login and register count for the last 7 days
// input : db - the database instance
// output : an array of objects containing the login and register count for each day for the past 7 days
// example output : [{name: "01/01/2022", "התחברויות": 0, "הרשמות": 0}, {name: "01/02/2022", "התחברויות": 0, "הרשמות": 0}]
// note: data needs to be as an array of objects to be used in graphs/charts.
const getUserTraffic = async (db) => {

    const users = await db.collection('Users').find().toArray();

    // get the traffic of the last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    // for each day , get the number of logins and number of registers

    const traffic = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        const dayFormatted = day.toLocaleDateString('en-GB'); // Formats date as dd/mm/yyyy
        const dayTraffic = {
            התחברויות: 0,
            הרשמות: 0,
            name: dayFormatted
        };
    
        for (const user of users) {
            if (user.LastLogin && user.LastLogin.toISOString().slice(0, 10) === day.toISOString().slice(0, 10)) {
                dayTraffic.התחברויות++;
            }
    
            if (user.RegisterDate && user.RegisterDate.toISOString().slice(0, 10) === day.toISOString().slice(0, 10)) {
                dayTraffic.הרשמות++;
            }
        }
    
        traffic.push(dayTraffic);
    }
    

    return traffic;

}



const getDataCountByTrailDiff  = async (db) => {

    const trails = await db.collection('Trails').find().toArray();

    const countByTrailDiff = [];

    let easy = 0;
    let medium = 0;
    let hard = 0;

    for (const trail of trails) {
        if (trail.difficulty === 1) {
            easy++;
        } else if (trail.difficulty === 2) {
            medium++;
        } else if (trail.difficulty === 3) {
            hard++;
        }
    }

    countByTrailDiff.push({ difficulty: 'קל', count: easy , fill: '#32CD32'});
    countByTrailDiff.push({ difficulty: 'בינוני', count: medium, fill: '#87CEFA' });
    countByTrailDiff.push({ difficulty: 'קשה', count: hard , fill: '#FF6F61' });

    return countByTrailDiff;

    
};




const getTrailRatingVsComments = async (db) => {
    const trails = await db.collection('Trails').find().toArray();

    const ratingVsComments = [];

    for (const trail of trails) {
        ratingVsComments.push({ rating: trail.averageRating, comments: trail.numComments });
    }

    return ratingVsComments;
}





const getUserEngagement = async (db) => {
    const users = await db.collection('Users').find().toArray();
    const trails = await db.collection('Trails').find().toArray();
    const tours = await db.collection('Tours').find().toArray();
    const commentNum = await db.collection('Comments').countDocuments();

    let favMarkedCount = 0;
    let ratingPlacedCount = 0;
    let tourRegistedCount = 0;


    for (const tour of tours) {
        tourRegistedCount += Object.keys(tour.registeredUsers).length;
    }


    for (const user of users) {
        favMarkedCount += user.favoriteTrails.length;
    }

    for (const trail of trails) {
        ratingPlacedCount += trail.ratingCount;
    }

    return [
        {
          name: 'סימון מסלול מועדף',
          count: favMarkedCount,
          fill: '#90EE90' // Light green
        },
        {
          name: 'דירוגים',
          count: ratingPlacedCount,
          fill: '#FFD700' // Light golden yellow
        },
        {
          name: 'תגובות',
          count: commentNum,
          fill: '#FFB6C1' // Light pink
        },
        {
          name: 'נרשמו לסיורים',
          count: tourRegistedCount,
          fill: '#ADD8E6' // Light blue
        }
      ];
    }