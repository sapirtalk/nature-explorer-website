
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import Greeting from "@/components/home_comp/Greeting";
import "../styles/global.css";
import { connectToDatabase , disconnectFromDatabase } from '@/api/middleware/mongo';

export const metadata = {
  title: "בשבילי חיפה",
  description: "שער אל פניני הטבע של חיפה, חבוי בגבולות העיר. חקרו שבילים נסתרים והצטרפו לקהילת הטיולים הנלהבת של סביבת העיר חיפה"
};

const rubik = Rubik ({subsets: ['latin'] , weight: ['300', '400', '500', '700']})

export default function RootLayout({ children }) {

  
  // this is a test function to check if the connection to the database is working and it is!
  const test = async () => {
    const db = await connectToDatabase(); // Connect to the database when the website starts
    // fetch data
    const data = await db.collection('movies').find({}).limit(1).toArray();
    // print to console
    console.log('fetched single year:' , data[0].year);
  }
  
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${rubik.className}`}>
        <Navbar />
        <div className='pt-[20%] lg:pt-[6%]'>
          <Greeting />
        </div>
        <main className="pt-[10%] lg:pt-[6%]">
        {test()}  
        {children}
        </main>
      </body>
    </html>
  );
}


