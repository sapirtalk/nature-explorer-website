
import { footer } from "@/styles/tailwindSaved"
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAdminLine } from "react-icons/ri"; 

const Footer = ({cookieCallback}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchCookie = async () => {
          const cookie = await cookieCallback('user', null, 'get');
          setUser(cookie);
        };
        fetchCookie();
    }, [cookieCallback]);


    return (
        <footer>
            <div className={footer.container}>
                <div className={footer.col}>
                    <div className={footer.row}>
                        <Link href='https://www.facebook.com/share/1oESuWaY789A8iUT/'>
                            <FaFacebook size={45} color={'#1877F2'} />
                        </Link>
                        <Link href='https://www.facebook.com/share/1oESuWaY789A8iUT/'>
                            <BsInstagram size={45} color={'#E1306C'} />
                        </Link>
                        <Link href='https://www.facebook.com/share/1oESuWaY789A8iUT/'>
                            <SiWhatsapp size={45} color={'#25d366'} />
                        </Link>
                    </div>
                </div>
                <div className={footer.rights}>
                    <p>בשבילי חיפה</p>
                    <p>כל הזכויות שמורות</p>
                </div>  
                <div> 
                {user && user.role !== 'user' && (
                    <Link href='/admin_panel' className="flex items-center group">
                        <p className="text-primary group-hover:text-blue-500 group-hover:underline">פאנל מנהלים</p>
                        &nbsp;
                        <RiAdminLine className='text-primary lg:text-[30px] group-hover:text-blue-500' />
                    </Link>
                )}    
                </div> 
            </div>
        </footer>
    )
}

export default Footer