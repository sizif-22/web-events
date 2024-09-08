import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import SetData from "./components/setData.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evnets",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={inter.className}>
        <SetData />
        {/* <SubLayout child={children}/> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
