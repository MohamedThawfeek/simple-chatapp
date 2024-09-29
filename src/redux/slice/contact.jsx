//Third party npm
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 contact: [],
 selectedContact: null
};

export const contactSlice = createSlice({
  name: "contactValues",
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setSelectContact: (state, action) => {
        state.selectedContact = action.payload;
    }
   
  },
});

// Export actions and reducer
export const { setContact, setSelectContact } = contactSlice.actions;
export default contactSlice.reducer;
