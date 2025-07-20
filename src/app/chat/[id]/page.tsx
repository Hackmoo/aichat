"use client";
import { useState, useRef, useEffect } from "react";
import Message from "../../components/message";
import { useStore } from "../../store/store";
import { useParams } from "next/navigation";

export default function Home() {
  const chat = useStore(state => state.chat);
  const addMessage = useStore(state => state.sendRequest);
  const sendingIsLocked = useStore(state => state.sendingIsLocked)

  const params = useParams()

  const [messages, setMessages] = useState([])
  const [currentChat, setCurrentChat] = useState({})
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setCurrentChat(chat[params.id])
  }, [])

  useEffect(() => {
     setMessages(currentChat?.messages || [{message: ''}])
  }, [currentChat])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleClick = () => {
    if (!value.trim() || sendingIsLocked) return;
    addMessage({id: Date.now(), message: value, type: 'user'}, currentChat.id);
    setValue('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col h-[100svh] w-full bg-gray-500">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto py-4 px-2"
      >
        {currentChat ? <div className="w-[70%] mx-auto flex flex-col gap-3">
          {messages?.map((el) => (
            <Message key={el.id} type={el.type} message={el.message} />
          ))}
          <div ref={messagesEndRef} />
        </div> : <div>
            There is no chat like it
            </div>}
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
          >
            {sendingIsLocked ? 'loading' : 'click'}
          </button>
        </div>
      </div>
    </div>
  );
}