"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
function Page() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleCustomLogin = async (e) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/");
    }
  };

  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  if (status === "loading")
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: "1.5rem", color: "#555" }}>
          Loading, please wait...
        </div>
      </div>
    );
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-200">
      <div className="w-[400px] h-[420px] bg-white p-8 rounded-2xl shadow-lg  flex flex-col  gap-6">
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
            className="border-2  text-gray-500 border-gray-300 p-2 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 text-gray-500 border-gray-300 p-2 rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={handleCustomLogin}
        >
          Submit
        </button>
        {error ? (
          <div>
            <h1 className="text-red-500">{error}</h1>{" "}
            <h1
              className="cursor-pointer underline text-blue-900"
              onClick={() => router.push("/signup")}
            >
              Goto signup
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Page;
