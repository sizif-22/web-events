// "use client";
// import React, { useState, useEffect } from "react";
// import { checkLoggedIn, signup } from "../firebase/firebase.auth";
// import { useRouter } from "next/navigation";
// import { addUser } from "../firebase/firebase.user";
// import "./signup.css";
// import { uploadProfileImg } from "../firebase/firebase.storage";
// import Loading from "../components/loading/loading";
// import Alert from "../components/alert/alert";

// export default function SignUp() {
//   const router = useRouter();
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState(false);
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const checkAuth = async () => {
//       const isLoggedIn = await checkLoggedIn();
//       setLoggedIn(isLoggedIn);
//     };

//     checkAuth();
//   }, []);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isThereImg, setIsThereImg] = useState(false);
//   const [file, setFile] = useState(
//     "https://firebasestorage.googleapis.com/v0/b/m4-tazkarti.appspot.com/o/profileImgs%2Fdownload.jpeg?alt=media&token=b1c122af-6c6d-4714-a985-7b6e1f006b6e"
//   );
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setAlert(false);
//     setDescription("");
//     setLoading(true);
//     if (password.length < 6) {
//       setDescription(`password must be atleast 6 characters long`);
//       setAlert(true);
//       setLoading(false);
//       return;
//     }
//     if (password != confirmPassword) {
//       setDescription(`Passwords don't match`);
//       setAlert(true);
//       setLoading(false);
//       setPassword("");
//       setConfirmPassword("");

//       return;
//     }
//     const signUpProcess = await signup(email, password);
//     console.log(signUpProcess);
//     if (signUpProcess == "error") {
//       setLoading(false);
//       setDescription("This Email Is Already Signed Up");
//       setAlert(true);
//       return;
//     }

//     if (isThereImg) {
//       await addUser({ firstName, lastName, companyName, email, photoUrl: "" });
//       await uploadProfileImg({ email, dir: "profileImgs", file });
//     } else {
//       await addUser({
//         firstName,
//         lastName,
//         companyName,
//         email,
//         photoUrl: file,
//       });
//     }
//     window.location.reload();
//   };
//   if (!loggedIn) {
//     return loading ? (
//       <Loading />
//     ) : (
//       <div
//         className="h-screen flex justify-center flex-col items-center  bg-slate-200"
//         id="signup "
//       >
//         {alert && <Alert description={description} />}
//         <br />
//         <div className="inline shadow-2xl shadow-slate-700 rounded-2xl">
//           <form className="form">
//             <p className="title">Register </p>
//             <p className="message">
//               Signup now and get full access to our app.{" "}
//             </p>
//             <div className="flex">
//               <label>
//                 <input
//                   required
//                   placeholder=""
//                   type="text"
//                   className="input"
//                   onChange={(e) => {
//                     setFirstName(e.target.value);
//                   }}
//                 />
//                 <span>Firstname</span>
//               </label>

//               <label>
//                 <input
//                   required
//                   placeholder=""
//                   type="text"
//                   className="input"
//                   onChange={(e) => {
//                     setLastName(e.target.value);
//                   }}
//                 />
//                 <span>Lastname</span>
//               </label>
//             </div>

//             <label>
//               <input
//                 required
//                 placeholder=""
//                 onChange={(e) => {
//                   setCompanyName(e.target.value);
//                 }}
//                 type="text"
//                 className="input"
//               />
//               <span>Company Name(optional)</span>
//             </label>

//             <label>
//               <input
//                 required
//                 placeholder=""
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//                 type="email"
//                 className="input"
//               />
//               <span>Email</span>
//             </label>

//             <label>
//               <input
//                 required
//                 placeholder=""
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 type="password"
//                 className="input"
//               />
//               <span>Password</span>
//             </label>
//             <label>
//               <input
//                 required
//                 placeholder=""
//                 type="password"
//                 className="input"
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                 }}
//               />
//               <span>Confirm password</span>
//             </label>
//             <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//               Profile Picture(optional)
//             </label>
//             <input
//               className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
//               type="file"
//               id="picture"
//               onChange={(e) => {
//                 setFile(e.target.files[0]);
//                 setIsThereImg(true);
//               }}
//             />
//             <button className="submit" onClick={handleSignUp}>
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   } else {
//     router.push("/");
//   }
// }
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate success and redirect
      console.log('Form submitted:', formData);
      router.push('./');
    }
  };

  const handleSkip = () => {
    router.push('./');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            {step === 1 ? 'Fill in your details to get started' : 'Add a profile picture'}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">@</span>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`pl-8 ${errors.username ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name (Optional)</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {formData.profilePicture ? (
                      <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <Label
                    htmlFor="profilePicture"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Label>
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex justify-between">
              {step === 1 ? (
                <Button type="submit" className="w-full">Continue</Button>
              ) : (
                <>
                  <Button type="submit" className="flex-1 mr-2">Complete</Button>
                  <Button type="button" variant="outline" onClick={handleSkip} className="flex-1 ml-2">
                    Skip
                  </Button>
                </>
              )}
            </div>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="./login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;