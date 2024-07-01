import Login from "@/components/login_comp/Login"



const LoginPage = () => {


    return (
        <div className="h-[80vh] lg:flex lg:flex-row lg:w-[100%]">

            <div className="hidden lg:flex w-[50%] h-full">
            </div>
            <div className="lg:w-[50%] h-full">
                <Login />
            </div>
        </div>
    )
}

export default LoginPage