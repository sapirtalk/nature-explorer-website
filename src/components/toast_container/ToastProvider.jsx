"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" pauseOnHover={false} hideProgressBar= {true} />
    </>
  );
}