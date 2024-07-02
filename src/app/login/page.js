import Login from "@/components/login_comp/Login"
import { cookies } from 'next/headers'



const LoginPage = () => {


    const cookieCallback = async (name , value , action) => {
        'use server'
        switch (action) {

            case 'set':
                cookies().set(name, value)
                break;
            case 'remove':
                cookies().delete(name)
                break;
        }
    }


    return (
        <div className="h-[80vh] lg:flex lg:flex-row lg:w-[100%]">

            <div className="hidden lg:flex w-[50%] h-full">
            </div>
            <div className="lg:w-[50%] h-full">
                <Login cookieCallback={cookieCallback} />
            </div>
        </div>
    )
}

export default LoginPage