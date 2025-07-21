import { create } from "zustand";

export const useStore = create((set, get) => ({
  sendingIsLocked: false,
  chat: [],
  addMessage: (message, id) => {
    const { chat, updateChatInLocalStorage} = get();
    let foundChat = chat.findIndex((el) => el.id === id);
    if (foundChat === -1) return;
    chat[foundChat].messages = [...chat[foundChat].messages, message];
    updateChatInLocalStorage()
  },
  sendRequest: (message, id) => {
    const { addMessage, sendingIsLocked } = get();
    set({ sendingIsLocked: true });
    addMessage(message, id);
    // Так как все AI чаты что я нашёл были платные, вот иммитация запроса на сервер. Были бы реальный запросы, я бы их вынес через axios в отдельную папку api
    setTimeout(() => {
      addMessage(
        { id: Date.now(), message: "test answer from AI", type: "chat" },
        id
      );
      set({ sendingIsLocked: false });
    }, 4000);
  },
  deleteChat: (id) => {
    const { chat, updateChatInLocalStorage } = get();
    set({ chat: chat.filter((el) => el.id !== id) });
    updateChatInLocalStorage()
  },
  addNewChat: () => {
    const { chat, updateChatInLocalStorage } = get();
    set({
      chat: [...chat, { messages: [], id: Date.now() }],
    });
   updateChatInLocalStorage()
  },
  setChat: (chat) => {
    set(state => state.chat = chat)
  },
  updateChatInLocalStorage: () => {
    const { chat } = get()
    try {
      localStorage.setItem(
        "chat",
        JSON.stringify({
          chat,
        })
      );
    } catch (err) {console.log('local storage has been not initiated')}
  }
}));
