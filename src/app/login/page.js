import Login from "@/components/login_comp/Login"
import { Image } from "@nextui-org/react"
import { cookies } from 'next/headers'



const LoginPage = () => {

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

    return (
        <div className="h-[80vh] lg:flex lg:flex-row lg:w-[100%]">

            <div className="hidden lg:flex lg:justify-center lg:items-center w-[50%] h-full">
                <Image src="\resources\images\trails\butterfly\butterfly.jpg" alt="login" width={1000} height={1000} />
            </div>
            <div className="lg:w-[50%] h-full">
                <Login cookieCallback={cookieCallback} />
            </div>
        </div>
    )
}

export default LoginPage