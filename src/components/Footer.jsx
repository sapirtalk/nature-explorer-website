
import { footer } from "@/styles/tailwindSaved"
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";



const Footer = () => {

   

   


 

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
                <div>
                    <p>בשבילי חיפה</p>
                    <p>כל הזכויות שמורות</p>
                </div>        
            </div>
        </footer>
    )
}

export default Footer