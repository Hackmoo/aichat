import { useRouter } from "next/navigation";

export default function ChatBar({name = '', id}: {name: string, id: number}) {
  const router = useRouter()
  return <div 
  className="w-full bg-gray-700 rounded-2xl p-4 cursor-pointer transition hover:bg-gray-500 active:bg-gray-400"
  onClick={() => router.push(`/chat/${id}`)}
  >
    {name}
    </div>;
}
