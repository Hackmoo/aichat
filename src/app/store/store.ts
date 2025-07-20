import { create } from "zustand";

export const useStore = create((set, get) => ({
  sendingIsLocked: false,
  messages: [
    { id: 0, message: "test message", type: "user" },
    { id: 1, message: "test message", type: "user" },
    { id: 2, message: "test message", type: "chat" },
  ],
  addMessage: (message) =>
    set((state) => {
      return { messages: [...state.messages, message] };
    }),
  sendRequest: (message) => {
    const { addMessage, sendingIsLocked } = get();
    set({sendingIsLocked: true})
    addMessage(message)
    // Так как все AI чаты что я нашёл были платные, вот иммитация запроса на сервер. Были бы реальный запросы, я бы их вынес через axios в отдельную папку api
    setTimeout(() => {
      addMessage( { id: Date.now(), message: "test answer from AI", type: "chat" })
      set({sendingIsLocked: false})
    }, 4000)
  },
}));
