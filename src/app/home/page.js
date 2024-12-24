"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../Component/Navbar";
import { useSession } from "next-auth/react";
const Message = ({ message, sender }) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } my-2`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
          sender === "user"
            ? "bg-blue-400 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const { data: session, status } = useSession();
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const sendMessage = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: input, sender: "user" },
      ]);
    }

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    if (data.message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, sender: "bot" },
      ]);

      const res1 = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: input, bot: data.message }),
      });

      if (res1.ok) {
        setFlag((v) => !v);
      }
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    async function call() {
      try {
        //add auth
        const res = await fetch("/api/history");
        const data = await res.json();
        if (res.ok) {
          setHistory(data.message);
        }
      } catch (err) {
        ("Something went wrong");
      }
    }
    call();
  }, [flag, open]);

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
    <div className="flex flex-col w-full h-[100vh]  ">
      <Navbar setOpen={setOpen} open={open} />
      <div className="w-full h-full flex gap-2">
        <div className="hidden md:block md:h-full w-[30%]  py-4 px-2 bg-gray-500 overflow-auto">
          {history.length > 0 &&
            history?.map((val) => (
              <div
                key={val.id}
                className="bg-gray-800 text-white p-4 mb-4 rounded-xl shadow-lg"
              >
                <h1 className="font-bold">User: {val.user}</h1>
                <h1>Chatbot: {val.bot}</h1>
                <h1 className="text-sm text-gray-400">
                  Timestamp: {val.createdAt}
                </h1>
              </div>
            ))}
        </div>
        {open && (
          <div className="absolute top-18 left-0 w-full h-screen bg-black bg-opacity-60 z-10 md:hidden">
            <div className="bg-gray-500 p-6">
              {history.length > 0 ? (
                history.map((val) => (
                  <div
                    key={val.id}
                    className="bg-gray-800 text-white p-4 mb-4 rounded-xl shadow-lg"
                  >
                    <h1 className="font-bold">User: {val.user}</h1>
                    <h1>Chatbot: {val.bot}</h1>
                    <h1 className="text-sm text-gray-400">
                      Timestamp: {val.createdAt}
                    </h1>
                  </div>
                ))
              ) : (
                <p className="text-white">No history available</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col justify-between w-full h-full border border-gray-300 rounded-lg p-4 bg-white shadow-lg">
          <div className="flex-1 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <Message key={index} message={msg.message} sender={msg.sender} />
            ))}
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full p-3 border border-gray-300 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
