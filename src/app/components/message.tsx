export default function Message({
  type = "user",
  message = "",
}: {
  type: string;
  message: string;
  id: number
}) {
  return (
    <>
      {}
      <div
        className={`${
          type === "user" ? "bg-gray-200" : "bg-slate-50 self-end"
        } h-fit  w-fit p-4 rounded-2xl`}
      >
        {message}
      </div>
    </>
  );
}
