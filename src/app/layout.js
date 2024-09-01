import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";
import SubLayout from "./subLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evnets",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SubLayout child={children}/>
      </body>
    </html>
  );
}
