import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./SessionWrapper";
import { ToastContainer, toast, Bounce } from 'react-toastify';


export const metadata = {
  title: "Get Me A Chai",
  description: "A crowd funding platform for creative projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white `}>
        <SessionWrapper>
          <Navbar />
          <div className="min-h-[87.4vh]">
            {children}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
