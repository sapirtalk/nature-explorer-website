'use client'

import { useEffect , useState } from "react"
import { Button } from "@nextui-org/react"
import { BiLogOut } from "react-icons/bi"
import { toast } from "react-toastify"
import { IoBarChart, IoNewspaperSharp } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs"
import { FaComments, FaFlag, FaMapSigns } from "react-icons/fa"
import { AiFillMessage } from "react-icons/ai"
import { FaUsersGear } from "react-icons/fa6"

const AdminNav = ({viewNav , admin , logoutCallback , curNav}) => {


    const [activeNav, setActiveNav] =  useState('dashboard')


    useEffect(() => {
        const changeNav = async () => {

            const current = await curNav

            if (current) {
                setActiveNav(current.value)
                console.log("current nav is: ", current.value)
            }
        }

        changeNav()
    }, [curNav])



    const handleClick = async (nav) => {
        setActiveNav(nav)
        await viewNav(nav)
    }


    const handleLogout = async () => {

        //show a confirmation before logging out
        if (!confirm('האם אתה בטוח שברצונך להתנתק?')) {
            return
        }
        toast.success('התנתקת בהצלחה')
        await logoutCallback()
        // reload the page
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }


    useEffect(() => {
        viewNav(activeNav)
    }, [activeNav])

    return (
        <div dir="rtl" className="flex flex-col h-full p-3 items-end border-tertiary border-l-2">
            <header className="text-[18px] pb-5 mb-5 border-b-2 border-tertiary flex justify-center w-full items-center">שלום {admin.firstName}, </header>
            <div className="flex flex-col w-full border-b-2 border-tertiary">
            {Object.keys(navItems).map((key, index) => (
                <Button
                    disabled={'users' === key && admin.role !== 'admin'}
                    key={index}
                    size="lg"
                    className={` ${admin.role !== 'admin' && key === 'users' ? 'hidden' : ''} text-lg w-full justify-start items-center mb-5 font-bold ${activeNav === key ? 'bg-tertiary text-white' : 'bg-transparent text-text'} hover:text-blue-500 hover:opacity-50`}
                    onClick={ () => handleClick(key)}
                >
                    {navItems[key].icon}
                    {translateNav(key)}
                </Button>
            ))}
            </div>
            <div className="flex flex-col w-full">
                <Button
                    className="text-[18px] w-full mt-5 font-bold bg-transparent text-text hover:opacity-50"
                    onClick={() => handleLogout()}
                >
                    <BiLogOut size={25} />
                    התנתק/י
                    
                </Button>
            </div>
        </div>
    )
}

export default AdminNav




const navItems = {
    dashboard: {
        icon: <IoBarChart className="ml-3" size={25} />,
    },
    trails: {
        icon: <FaMapSigns className="ml-3" size={25} />,
    },
    tours: {
        icon: <FaFlag className="ml-3" size={25} />,
    },
    articles: {
        icon: <IoNewspaperSharp className="ml-3" size={25} />,
    },
    users: {
        icon: <FaUsersGear className="ml-3" size={25} />,
    }
};


const translateNav = (item) => {
    switch (item) {
        case 'dashboard':
            return 'כללי';
        case 'trails':
            return 'מסלולים';
        case 'tours':
            return 'סיורים';
        case 'articles':
            return 'כתבות';
        case 'about':
            return 'עלינו';
        case 'contact':
            return 'צור קשר';
        case 'comments':
            return 'תגובות';
        case 'users':
            return 'משתמשים';
        default:
            return item;
    }
}









