"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Page() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const [error, setError] = useState("");

  async function Register() {
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName,
          email,
          password,
          lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
        router.push("/");
      } else {
        setError(data.error.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration. Please try again.");
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-200">
      <div className="w-[400px] h-[520px] bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
        <button
          onClick={() => signIn("google")}
          className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center gap-2"
        >
          <Image
            src="/google.png"
            width={100}
            height={100}
            alt="Google Icon"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter your first name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md"
            placeholder="Enter your last name"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 text-gray-500 border-gray-300 p-2 rounded-md"
            placeholder="Enter your password"
          />
          {/* Eye icon to toggle password visibility */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.75c-3.747 0-6.755 2.945-6.755 6.25S8.253 17.25 12 17.25c1.423 0 2.759-.527 3.759-1.401l3.054 3.053c.11.112.251.162.396.162.145 0 .285-.056.395-.162a1.58 1.58 0 0 0 0-2.236L16.758 12c1.06-.709 1.757-1.82 1.757-3.25 0-2.512-2.443-4.5-5.005-4.5z"
                />
              </svg>
            )}
          </span>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={Register}
        >
          Submit
        </button>

        {error ? <h1 className="text-red-500">{error}</h1> : " "}
      </div>
    </div>
  );
}

export default Page;
