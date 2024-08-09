import Profile from "@/components/user/Profile"
import { cookies } from 'next/headers'




const ProfilePage = () => {


    const user = cookies().get('user')
    const curUser = user ? safeJSONParse(user.value) : null;

    return (
        <div>
        <Profile user={curUser} cookieCallback={cookieCallback} />
        </div>
    )
}


const cookieCallback = async (name , value , action) => {
    'use server'
  
    const isCookiesEnabled = cookies().has(name)
  
    switch (action) {
  
        case 'set':
            cookies().set(name, value , {maxAge: 60 * 60 * 24 * 30})
            break;
        case 'remove':
            cookies().delete(name)
            break;
        case 'get':
            return isCookiesEnabled ? JSON.parse(cookies().get(name).value) : null  
    }
  }



  const safeJSONParse = (str) => {
    try {
        console.log(str)
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}




export default ProfilePage