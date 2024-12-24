"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

function Page() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function call() {
      try {
        const res = await fetch(
          "https://uplyft-backend2.onrender.com/products"
        );
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    call();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://uplyft-backend2.onrender.com/search?q=${searchQuery}`
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {}
  };

  if (loading)
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
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      <div className="flex items-center justify-center space-x-4 mb-8">
        <button
          onClick={() => router.back()}
          className="px-5 py-2 text-lg bg-blue-500 text-white border-none rounded-md cursor-pointer"
        >
          Back
        </button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-80 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={fetchProducts}
          className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
          <FaSearch size={20} />
        </button>
      </div>

      <div className="w-full max-w-3xl">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl text-black font-semibold mb-2">
                {product.name}
              </h2>
              <p className="text-gray-700">Category: {product.category}</p>
              <p className="text-gray-900 font-medium">
                Price: ${product.price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
