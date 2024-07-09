
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/global.css";
import "../styles/embla.css";
import ToastProvider from "@/components/toast_container/ToastProvider";
import BackButton from "@/components/BackButton";
import Providers from "./providers";
import { cookies } from 'next/headers'


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
      <body className={`${rubik.className} `}>
        <Providers>
        <ToastProvider>
        <Navbar cookieCallback={cookieCallback} />
        <main className="pt-[100px] lg:pt-[2%] lg:mx-20 lg:min-h-[80vh]">
         <BackButton /> 
        {children}
        </main>
        <Footer />
        </ToastProvider>
        </Providers>
      </body>
    </html>
  );
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