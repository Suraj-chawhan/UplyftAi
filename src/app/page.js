"use client";

import React, { useEffect, useRef, useState } from "react";
import Model from "../../Component/Space";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Page() {
  const router = useRouter();
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();
  const [Page, setPage] = useState([
    { title: "About", route: "/about" },
    { title: "Contact", route: "/contact" },
    { title: "Help", route: "/help" },
  ]);
  useEffect(() => {
    // GSAP Animations for DOM sections
    gsap.fromTo(section1Ref.current, { x: -200 }, { x: 0, duration: 2 });

    gsap.fromTo(
      section2Ref.current.children,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 1,
        scrollTrigger: {
          trigger: section2Ref.current.children,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      section3Ref.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 80%",
          scrub: true,
        },
      }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className=" w-full h-[300vh] overflow-hidden">
      <Canvas className=" fixed z-[-10] top-0 left-0 w-full h-[60vh] ">
        <ambientLight intensity={2} />
        <Stars
          radius={100}
          depth={50}
          count={700}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Model />
      </Canvas>

      <div className="absolute z-10 top-0 w-full h-full">
        <section
          className="h-[100vh] flex items-center justify-center text-white bg-transparent"
          ref={section1Ref}
        >
          <div className="text-center flex flex-col gap-6">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-purple-500 md:text-8xl">
              Welcome to Chatbot AI
            </h1>
            <p className="text-2xl mb-8 opacity-80">
              Your AI-powered companion for the future.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-4 bg-white  text-black rounded-lg hover:bg-blue-700 transition-all w-[50%] self-center"
            >
              Try ChatBot
            </button>
          </div>
        </section>

        <section className="h-[100vh] flex items-center justify-center bg-transparent">
          <div className="text-center flex gap-8" ref={section2Ref}>
            {Page.map((val, index) => (
              <div
                key={index}
                className="w-[300px] h-[400px] bg-white/10 rounded-lg p-6 flex flex-col justify-center md:w-[400px] md:h-[600px]"
              >
                <h2 className="text-3xl font-semibold mb-4">{val.title}</h2>
                <button
                  onClick={() => router.push(val.route)}
                  className="px-8 py-4 bg-white  text-black rounded-lg hover:bg-blue-700 transition-all self-center"
                >
                  Visit {val.title} Page
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          className="h-[100vh] flex items-center justify-center bg-transparent"
          ref={section3Ref}
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">
              Checkout our new Ecommerce Page
            </h2>
            <p className="text-2xl mb-8">
              Explore the future of AI with integrated in ecommerce site.
            </p>
            <button
              onClick={() => router.push("/ecommerce")}
              className="px-8 py-3 bg-green-500 rounded-lg hover:bg-green-700"
            >
              Learn More
            </button>
          </div>
        </section>

        <footer className="text-center p-8 bg-black text-2xl">
          © Uplyft.ai - All Rights Reserved
        </footer>
      </div>
    </div>
  );
}

export default Page;
