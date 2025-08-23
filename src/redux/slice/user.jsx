//Third party npm
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 user: null,
 token: localStorage.getItem("token") || null,
};

export const userSlice = createSlice({
  name: "userValues",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    }
   
  },
});

// Export actions and reducer
export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
