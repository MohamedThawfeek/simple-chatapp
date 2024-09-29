//Third party npm
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 messages: []
};

export const userSlice = createSlice({
  name: "otpValues",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
   
  },
});

// Export actions and reducer
export const { setMessages } = userSlice.actions;
export default userSlice.reducer;
