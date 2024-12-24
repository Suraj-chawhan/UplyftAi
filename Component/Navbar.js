"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Navbar({ setOpen, open }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="w-full py-4 px-6 bg-gradient-to-br from-purple-500 to-red-500 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl text-white font-bold cursor-pointer">LoGo</h1>

      {/* Navbar links (Desktop) */}
      <ul className={`${open ? "block flex gap-6" : "hidden"} md:flex gap-6`}>
        <Link href="/">
          <li className="text-white hover:text-yellow-300 transition-colors">
            HOME
          </li>
        </Link>
        <Link href="/about">
          <li className="text-white hover:text-yellow-300 transition-colors">
            ABOUT
          </li>
        </Link>
        <Link href="/contact">
          <li className="text-white hover:text-yellow-300 transition-colors">
            CONTACT
          </li>
        </Link>
        <Link href="/ecommerce">
          <li className="text-white hover:text-yellow-300 transition-colors">
            ECOMMERCE
          </li>
        </Link>
      </ul>

      {/* Login/Signup or Logout Buttons */}
      <div className="flex items-center gap-4">
        {!session ? (
          <>
            <button
              onClick={() => router.push("/signin")}
              className="text-white hover:text-yellow-300 rounded-2xl px-4 py-2 bg-green-500 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="text-white hover:text-yellow-300 rounded-2xl  px-4 py-2  bg-blue-500 transition-colors"
            >
              Signup
            </button>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="text-white hover:text-yellow-300  rounded-2xl px-4 py-2  bg-blue-500   transition-colors"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        {!open ? (
          <button
            className="text-white text-3xl"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        ) : (
          <button
            className="text-white text-3xl"
            onClick={() => setOpen((prev) => !prev)}
          >
            X
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
