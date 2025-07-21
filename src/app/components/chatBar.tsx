import { useParams, useRouter } from "next/navigation";
import { useStore } from "../store/store";
import TrashCan from "../icons/trashCan";

export default function ChatBar({
  name = "",
  id,
}: {
  name: string;
  id: number;
}) {
  const router = useRouter();
  const param = useParams();
  const deleteChatStore = useStore((state) => state.deleteChat);
  const deleteChat = () => {
    deleteChatStore(id);
    router.push("/");
    if (param.id == id) {
      router.push("/");
    }
  };
  return (
    <div
      className="w-full bg-gray-700 rounded-2xl p-4 cursor-pointer transition flex hover:bg-gray-500 active:bg-gray-400"
      onClick={() => router.push(`/chat/${id}`)}
    >
      <div className="flex-1">{name}</div>
      <div
        className="bg-red-400 rounded-2xl p-2 transition hover:bg-red-500 active:bg-red-600"
        onClick={(e) => {
          e.stopPropagation();
          deleteChat();
        }}
      >
        <TrashCan />
      </div>
    </div>
  );
}
