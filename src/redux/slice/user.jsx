//Third party npm
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 user: null
};

export const userSlice = createSlice({
  name: "userValues",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
   
  },
});

// Export actions and reducer
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
