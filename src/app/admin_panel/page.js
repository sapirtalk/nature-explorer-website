

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


const AdminPanel = () => {

    
    const login = async (admin) => {
       'use server'
        cookies().set('admin_user', JSON.stringify(admin))
    };

    const logout = async () => {
        'use server'
        cookies().delete('admin_user')
    };


  const view = async () => {


    if (cookies().has('admin_user')) {
      const admin = cookies().get('admin_user').value ? JSON.parse(cookies().get('admin_user').value) : emptyAdmin
      return (
        <div className="flex flex-col w-[100%] h-[100vh] justify-center items-center">
            <div className="flex flex-row-reverse w-full h-[90%]">
                <div className="w-[15%] h-full p-3 pb-0">       
                    <AdminNav viewNav={getView} logoutCallback={logout} admin={admin} />
                </div> 
                <div className="w-[85%] h-full p-3">
                    {selectComponent()}
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



const getView = async (view) => {
    'use server'
    cookies().set('viewNav', view)
}



const selectComponent = async () => {
    'use server'

    const viewNavCurrent = cookies().get('viewNav')
    const admin = cookies().get('admin_user').value ? JSON.parse(cookies().get('admin_user').value) : emptyAdmin
    const viewNav = viewNavCurrent ? viewNavCurrent.value : 'dashboard'



    switch (viewNav) {
        case 'dashboard':
            return <AdminDashboard admin={admin} />
        case 'trails':
            return <AdminTrails admin={admin} />
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
            return <AdminUsers admin={admin} />
        default:
            return <AdminDashboard admin={admin} />
    }
}


const emptyAdmin = {
    firstName: '',
    lastName: '',
    email: '',
}