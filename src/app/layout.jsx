import { Rubik } from "next/font/google";
import Providers from "./providers";
import { cookies } from 'next/headers';
import ClientLayout from "./ClientLayout";
import "../styles/global.css";
import "../styles/embla.css";

export const metadata = {
  title: "בשבילי חיפה",
  description: "שער אל פניני הטבע של חיפה, חבוי בגבולות העיר. חקרו שבילים נסתרים והצטרפו לקהילת הטיולים הנלהבת של סביבת העיר חיפה"
};

const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

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
          <ClientLayout cookieCallback={cookieCallback}>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

const cookieCallback = async (name, value, action) => {
  'use server'

  const isCookiesEnabled = cookies().has(name);

  switch (action) {
    case 'set':
      cookies().set(name, value, { maxAge: 60 * 60 * 24 * 30 });
      break;
    case 'remove':
      cookies().delete(name);
      break;
    case 'get':
      return isCookiesEnabled ? JSON.parse(cookies().get(name).value) : null;
  }
}
