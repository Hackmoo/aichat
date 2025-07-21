'use client'

import { useRouter } from "next/navigation"
import { useStore } from "./store/store"

export default function NotFound() {
    const addNewChat = useStore((state) => state.addNewChat)

    return (
        <div className="flex w-full h-[100svh] overflow-hidden items-center justify-center flex-col text-white">
            <h1 className="text-4xl font-bold">Hi!</h1>
            <h2 className="text-3xl font-semibold">Don't have a chat? start a new one!</h2>
            <button 
                    className="border text-2xl px-3.5 py-2 cursor-pointer rounded-2xl shadow transition duration-200 hover:bg-gray-600 hover:text-white hover:scale-90 active:scale-110 mt-10"
                    onClick={() => addNewChat()}
                    >
                New chat
            </button>
        </div>
    )
}