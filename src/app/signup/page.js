"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { checkLoggedIn, signup } from "../firebase/firebase.auth";
import { uploadProfileImg } from "../firebase/firebase.storage";
import Loading from "../components/loading/loading";
import Alert from "../components/alert/alert";
import { db, fetchAllUsers } from "../firebase/firebase.user";
import { useDispatch } from "react-redux";
import { handleUserState } from "@/lib/user.data";
import * as firestore from "firebase/firestore";
import ImageCard from "./imgCard";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [description, setDescription] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [fileError, setFileError] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/m4-tazkarti.appspot.com/o/profileImgs%2Fdownload.jpeg?alt=media&token=b1c122af-6c6d-4714-a985-7b6e1f006b6e",
  });
  const [errors, setErrors] = useState({});
  const [isThereImg, setIsThereImg] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);

      const users = await fetchAllUsers();
      const existingUsernames = users.map((user) => user.username);
      setUsernames(existingUsernames);
    };

    checkAuth();
  }, []);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (usernames.includes(formData.username.trim())) {
      newErrors.username = "Username already exists";
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFileType = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/tiff",
      "image/heif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    if (file.size > 4 * 1024 * 1024) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      if (!validateFileType(file)) {
        setFileError(
          "Your photos couldn't be uploaded. Photos should be less than 4 MB and saved as JPG, PNG, GIF, TIFF, HEIF or WebP files."
        );
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      setIsThereImg(true);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateStep1()) return;

    try {
      setAlert(false);
      setDescription("");
      setLoading(true);

      const signUpProcess = await signup(formData.email, formData.password);

      if (signUpProcess === "error") {
        setLoading(false);
        setDescription("This Email Is Already Signed Up");
        setAlert(true);
        return;
      }
      const joinedAt = firestore.serverTimestamp();
      await firestore.addDoc(firestore.collection(db, "user"), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        email: formData.email,
        username: formData.username,
        photoUrl: formData.profilePicture,
        events: [],
        plan: {
          startDate: joinedAt,
          endDate: null,
          credit: 2,
          maxCapacity: 100,
        },
        joinedAt,
        accountType: "Organizer",
      });
      console.log("User added");
      const userObject = {
        isLoggedIn: true,
        isVerified: false,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        email: formData.email,
        username: formData.username,
        photoUrl: formData.profilePicture,
        events: [],
        plan: {
          startDate: joinedAt,
          endDate: null,
          credit: 2,
          maxCapacity: 100,
        },
        joinedAt,
        accountType: "Organizer",
      };
      dispatch(handleUserState(userObject));
      setLoading(false);
      setStep(2);
    } catch (error) {
      setLoading(false);
      setDescription("An error occurred during signup. Please try again.");
      setAlert(true);
    }
  };

  const handleProfilePicture = async () => {
    try {
      setLoading(true);

      if (isThereImg) {
        await uploadProfileImg({
          email: formData.email,
          dir: "profileImgs",
          file: formData.profilePicture,
        });
      }

      router.push("/");
    } catch (error) {
      setDescription("Error uploading profile picture. Please try again.");
      setAlert(true);
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  if (loggedIn && step === 1) {
    router.push("/");
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 py-12 px-4">
      {alert && <Alert description={description} className={"top-5 fixed"} />}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Create an account" : "Add a profile picture"}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Fill in your details to get started"
              : "Customize your profile with a photo"}
          </CardDescription>
        </CardHeader>

        {step === 1 ? (
          <form onSubmit={handleSignUp}>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">
                      @
                    </span>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`pl-8 ${
                        errors.username ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
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
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="./login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        ) : (
          <ImageCard
            formData={formData}
            handleProfilePicture={handleProfilePicture}
            handleSkip={handleSkip}
            handleFileChange={handleFileChange}
            fileError={fileError}
            isThereImg={isThereImg}
          />
        )}
      </Card>
    </div>
  );
};

export default SignUp;
