import { Inter } from "next/font/google";
import "./globals.css";
import SubLayout from "./sublayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evnety",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SubLayout child={children} />
      </body>
    </html>
  );
}
