import { configureStore } from "@reduxjs/toolkit";
import Message from "./slice/messages"
import Contact from "./slice/contact"
import User from "./slice/user"


const store = configureStore({
  reducer: {
    message: Message,
    contact: Contact,
    user:User
  },
});

export default store;
