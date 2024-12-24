"use client";

import React from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Back
      </button>
      <h1 style={{ fontSize: "3rem", margin: "0" }}>Uplyft.ai</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "20px", color: "#555" }}>
        Empowering businesses with cutting-edge AI solutions.
      </p>
      <p style={{ fontSize: "1rem", marginTop: "10px", color: "#777" }}>
        Transform your workflow, enhance productivity, and drive innovation with
        Uplyft.ai.
      </p>
    </div>
  );
}

export default Page;