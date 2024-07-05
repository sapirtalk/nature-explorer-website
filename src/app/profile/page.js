import Profile from "@/components/user/Profile"
import { cookies } from 'next/headers'




const ProfilePage = () => {


    const user = cookies().get('user')
    const curUser = user ? JSON.parse( user.value ) : null
    
    return (
        <div>
        <Profile user={curUser} />
        </div>
    )
}




export default ProfilePage