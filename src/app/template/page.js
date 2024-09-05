// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Loading from "../components/loading/loading";
// import TemplateCard from "./template.card";
// import "./theme.card.css";

// export default function Template() {
//   const router = useRouter();
//   const [verified, setVerified] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const userState = JSON.parse(sessionStorage.getItem("userState"));

//       if (!userState?.isLoggedIn || !userState?.isVerified) {
//         setVerified(false);
//       } else {
//         setVerified(true);
//       }

//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         <Loading />
//       </div>
//     );
//   }

//   if (!verified) {
//     router.push("/");
//     return null;
//   }

//   const templates = [
//     { title: "Theme 1", imgSrc: "/images/theme1.png" },
//     { title: "Theme 2", imgSrc: "/images/theme2.png" },
//     { title: "Theme 3", imgSrc: "/images/theme3.png" },
//   ];

//   // const handleSelectTemplate = (title) => {
//   //   alert(`You selected ${title}`);
//   //   // Implement the selection logic here
//   // };

//   return (
//     <div className="templates-page p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Choose a Template</h1>
//       <div className="templates-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {templates.map((template, index) => (
//           <TemplateCard
//             key={index}
//             title={template.title}
//             imgSrc={template.imgSrc}
//             // onSelect={() => handleSelectTemplate(template.title)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

const Template = () => {
  return <></>;
};
export default Template;
