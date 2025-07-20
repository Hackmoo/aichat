import { create } from "zustand";

export const useStore = create((set, get) => ({
  sendingIsLocked: false,
  chat: [
    {
      messages: [
        { id: 0, message: "test message", type: "user" },
        { id: 1, message: "test message", type: "user" },
        { id: 2, message: "test message", type: "chat" },
      ],
      id: 0
    },
  ],
  addMessage: (message, id) => {
    const { chat } = get();
    let foundChat = chat.findIndex(el => el.id === id);
    if(foundChat === -1) return;
    chat[foundChat].messages = [...chat[foundChat].messages, message]
  },
  sendRequest: (message, id) => {
    const { addMessage, sendingIsLocked } = get();
    set({ sendingIsLocked: true });
    addMessage(message, id);
    // Так как все AI чаты что я нашёл были платные, вот иммитация запроса на сервер. Были бы реальный запросы, я бы их вынес через axios в отдельную папку api
    setTimeout(() => {
      addMessage(
        { id: Date.now(), message: "test answer from AI", type: "chat" }, id
      );
      set({ sendingIsLocked: false });
    }, 4000);
  },
  deleteChat: (id) => {
    const { chat } = get()
    set({chat: chat.filter(el => el.id !== id)})
  }
}));
