'use client'

import "./globals.css";
import SideBar from "./components/sidebar";
import { useEffect } from "react";
import { useStore } from "./store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const chat = useStore(state => state.chat)
const setChat = useStore(state => state.setChat)

  useEffect(() => {
    const localStorageChat: string = localStorage.getItem('chat')
    if(chat !== JSON.parse(localStorageChat)) setChat(JSON.parse(localStorageChat))
      console.log(chat)
  }, [])
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row">
          <SideBar />
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
