
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/global.css";
import ToastProvider from "@/components/toast_container/ToastProvider";
import BackButton from "@/components/BackButton";


export const metadata = {
  title: "בשבילי חיפה",
  description: "שער אל פניני הטבע של חיפה, חבוי בגבולות העיר. חקרו שבילים נסתרים והצטרפו לקהילת הטיולים הנלהבת של סביבת העיר חיפה"
};

const rubik = Rubik ({subsets: ['latin'] , weight: ['300', '400', '500', '700']})

export default function RootLayout({ children }) {

  

  
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${rubik.className}`}>
        <ToastProvider>
        <Navbar />
        <main className="pt-[100px] lg:pt-[6%]">
         <BackButton /> 
        {children}
        </main>
        <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}


