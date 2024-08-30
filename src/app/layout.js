import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "evnets",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" grid grid-cols-5 h-screen">
          <SideBar />
          <div className=" col-span-4 bg-black">{children}</div>
        </div>
        <Footer/>
      </body>
    </html>
  );
}
