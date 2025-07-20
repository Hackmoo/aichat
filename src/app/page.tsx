'use client'

import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex w-full h-[100svh] overflow-hidden items-center justify-center flex-col">
            <h1 className="text-4xl font-bold">Ooops...</h1>
            <h2 className="text-3xl font-semibold">Looks like we do not have it</h2>
            <button 
                    className="border text-2xl px-3.5 py-2 cursor-pointer rounded-2xl shadow transition duration-200 hover:bg-gray-600 hover:text-white hover:scale-90 active:scale-110 mt-10"
                    onClick={() => router.push('/')}
                    >
                Back home
            </button>
        </div>
    )
}