
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../styles/global.css";
import { connectToDatabase , disconnectFromDatabase } from '@/api/middleware/mongo';

export const metadata = {
  title: "בשבילי חיפה",
  description: "שער אל פניני הטבע של חיפה, חבוי בגבולות העיר. חקרו שבילים נסתרים והצטרפו לקהילת הטיולים הנלהבת של סביבת העיר חיפה"
};

const rubik = Rubik ({subsets: ['latin'] , weight: ['300', '400', '500', '700']})

export default function RootLayout({ children }) {

  

  const test = async () => {
    const db = await connectToDatabase(); // Connect to the database when the website starts
    // fetch data
    const data = await db.collection('movies').find({}).limit(1).toArray();
    // print to console
    console.log('fetched single year:' , data[0].year);

    // Disconnect from the database
    await disconnectFromDatabase();
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
        <main className="pt-[30%] lg:pt-[10%]">
        {test()}
        {children}
        </main>
      </body>
    </html>
  );
}


