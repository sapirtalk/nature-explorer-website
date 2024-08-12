"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/toast_container/ToastProvider";
import BackButton from "@/components/BackButton";
import TopBar from "@/components/TopBar";

const ClientLayout = ({ children, cookieCallback }) => {
  const pathname = usePathname();
  const isAdminPanel = pathname === '/admin_panel';

  return (
    <>
      <ToastProvider>
        {!isAdminPanel && <Navbar cookieCallback={cookieCallback} />}
        {!isAdminPanel && <TopBar />}
        <main className={isAdminPanel ? "" : "lg:mx-20 lg:p-5"}>
          {!isAdminPanel && <BackButton />}
          {children}
        </main>
        {!isAdminPanel && <Footer cookieCallback={cookieCallback} />}
      </ToastProvider>
    </>
  );
};

export default ClientLayout;
