import { footer } from "@/styles/tailwindSaved"
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";


const Footer = () => {
    return (
        <footer>
            <div className={footer.container}>
                <div className={footer.col}>
                    <div className={footer.row}>
                        <FaFacebook size={45} color={'#1877F2'} />
                        <BsInstagram size={45} color={'#E1306C'} />
                        <SiWhatsapp size={45} color={'#25d366'} />
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