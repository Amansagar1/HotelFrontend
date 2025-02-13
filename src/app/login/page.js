/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { loginUser, registerUser } from "../../Webservices/HotelAPIController"; // Import the API functions
import Cookies from "js-cookie"; 
import { signIn } from "next-auth/react";
const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Debug logging
  useEffect(() => {
    console.log("Auth Status:", status);
    console.log("Session:", session);
  }, [status, session]);

  // Handle session state changes
  useEffect(() => {
    if (status === 'authenticated' && session) {
      console.log("Authenticated, redirecting to rooms...");
      router.push('/rooms');
    }
  }, [status, session, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Handle form submit (for login and sign up)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation for empty fields
    if (!email || !password) {
      setError("Email and Password are required.");
      setIsLoading(false);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const userData = { fullName, email, mobileNumber, password, confirmPassword };
        const registrationResult = await registerUser(userData);

        if (registrationResult) {
          // Save credentials in cookies
          Cookies.set("userFullName", fullName, { expires: 7 }); // expires in 7 days
          Cookies.set("userEmail", email, { expires: 7 });
          Cookies.set("token", registrationResult.token, { expires: 7 }); // Assuming the API returns a token

          router.push("/rooms"); 
        }
      } else {
        // Login user
        const loginData = { email, password };
        const loginResult = await loginUser(loginData);

        if (loginResult) {
          // Save credentials in cookies
          Cookies.set("userFullName", loginResult.fullName, { expires: 7 }); // Assuming loginResult contains the user's full name
          Cookies.set("userEmail", loginResult.email, { expires: 7 });
          Cookies.set("token", loginResult.token, { expires: 7 }); // Assuming loginResult contains the token

          router.push("/rooms"); 
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center w-full bg-yellow-600">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">{isSignUp ? "Sign Up" : "Login"}</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            {isSignUp ? "Create a new account" : "Login with your email and password"}
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {isSignUp && (
              <input
                className="p-2 mt-2 rounded-xl border"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              className="p-2 mt-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {isSignUp && (
              <input
                className="p-2 mt-2 rounded-xl border"
                type="text"
                name="mobileNumber"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            )}

            <input
              className="p-2 mt-2 rounded-xl border"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isSignUp && (
              <input
                className="p-2 mt-2 rounded-xl border"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium mt-4"
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="mt-6 items-center text-gray-100 flex">
            <hr className="border-gray-300 flex-grow" />
            <p className="text-center text-sm mx-4">OR</p>
            <hr className="border-gray-300 flex-grow" />
          </div>

          <button
            disabled={isLoading}
            onClick={() => signIn('google')} 
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-gray-50 font-medium disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle className="mr-3 h-6 w-6" />
                Sign in with Google
              </>
            )}
          </button>

          <div className="mt-10 text-sm border-b border-gray-500 py-5 flex items-center justify-center">
            <button
              className="text-[#002D74] hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <Image
            src='/images/img3.jpg'
            width={500}
            height={400}
            className="rounded-2xl max-h-[1600px]"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;