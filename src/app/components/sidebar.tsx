"use client";

import { useEffect, useState } from "react";
import AddChatIcon from "../icons/addChatIcon";
import ArrowMinimizeIcon from "../icons/ArrowMinimize";
import ChatBar from "./chatBar";
import { AnimatePresence, motion } from "framer-motion";

export default function SideBar() {
  const [isSidebarOpen, changeIsSidebarOpen] = useState<boolean>(true);
  const [initialRender, setInitialRender] = useState<boolean>(true);

 useEffect(() => {
    setInitialRender(() => false);
  }, []);

  const changeSidebarState = () => {
    changeIsSidebarOpen((e) => !e);
  };
  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="w-[20svw] bg-gray-600 shadow h-[100svh] text-white px-4 pt-10"
            initial={initialRender ? false : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              ease: "linear",
              duration: 0.1,
              type: "tween",
            }}
          >
            <div className="flex items-center">
              <div className="font-[impact] text-5xl w-full">ChatMe</div>
              <button
                className="cursor-pointer px-4 py-2 rounded-2xl transition duration-200 hover:bg-gray-500 active:bg-gray-400"
                onClick={() => changeSidebarState()}
              >
                <ArrowMinimizeIcon />
              </button>
            </div>
            <button className="flex mt-4 items-center gap-2.5 cursor-pointer px-4 py-2 rounded-2xl transition duration-200 shadow bg-gray-700 hover:bg-gray-500 active:bg-gray-400">
              <AddChatIcon />
              New Chat+
            </button>
            <div>
              <ChatBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isSidebarOpen && (
          <motion.button
            initial={{
              x: "-100%",
              y: "2.5rem",
            }}
            animate={{
              x: "1rem",
              y: "2.5rem",
            }}
            transition={{
              duration: 0.1,
              delay: 0.1,
            }}
            className="cursor-pointer px-4 py-2 rounded-2xl transition duration-200 bg-gray-600 absolute hover:bg-gray-500 active:bg-gray-400"
            onClick={() => changeSidebarState()}
          >
            <ArrowMinimizeIcon rotate={true}/>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
