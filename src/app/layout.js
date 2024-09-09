import { Inter } from "next/font/google";
import "./globals.css";
import SubLayout from "./sublayout";

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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body className={inter.className}>
        <SubLayout child={children} />
      </body>
    </html>
  );
}
