"use client";
import { useState, useRef, useEffect } from "react";
import Message from "../../components/message";
import { useStore } from "../../store/store";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
  const chat = useStore((state) => state.chat);
  const addMessage = useStore((state) => state.sendRequest);
  const sendingIsLocked = useStore((state) => state.sendingIsLocked);
  const router = useRouter();

  const params = useParams();
  const chatId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [currentChat, setCurrentChat] = useState(null);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chat || !chatId) return;

    const foundChat = chat.find((c) => c.id.toString() === chatId.toString());

    setCurrentChat(foundChat);
  }, [chat, chatId, router]);

  useEffect(() => {
    if (currentChat?.messages) scrollToBottom();
  }, [currentChat?.messages]);

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (!value.trim() || sendingIsLocked || !currentChat) return;
    addMessage(
      { id: Date.now(), message: value, type: "user" },
      currentChat.id
    );
    setValue("");
  };

  if (!currentChat) {
    return (
      <div className="flex flex-col h-[100svh] w-full bg-gray-500 items-center justify-center text-white">
        <p>Loading or chat not found...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100svh] w-full bg-gray-500">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto py-4 px-2"
      >
        {currentChat.messages?.length > 0 ? (
          <div className="w-[70%] mx-auto flex flex-col gap-3">
            {currentChat.messages.map((el) => (
              <Message key={el.id} type={el.type} message={el.message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="w-full text-center mt-10 text-white text-4xl font-bold">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center sticky bottom-0 bg-gray-400 shadow-2xl py-6">
        <div className="w-[70%] border-2 border-gray-600 rounded-2xl px-4 py-2 flex items-center justify-center bg-gray-200">
          <textarea
            ref={inputRef}
            onInput={(e) => setValue(e.currentTarget.value)}
            value={value}
            placeholder="Hi, let's look up for something new!"
            className="w-full outline-none resize-none max-h-60 bg-transparent"
          />
          <button
            className="cursor-pointer transition p-4 rounded-2xl hover:text-white hover:bg-gray-600 active:bg-gray-500"
            onClick={handleClick}
            disabled={sendingIsLocked}
          >
            {sendingIsLocked ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
