import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserDetails: "hello world",
    open:false,
    create:false,
    deleteNote:false
};

const UserSlice = createSlice({
    name: 'UserAuth',
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
          state.UserDetails = action.payload?.user
      },
      setOpen: (state, action) => {
        state.open = action.payload
      },
      setCreate: (state, action) => {
        state.create = action.payload
      },
      setDelete: (state, action) => {
        state.deleteNote = action.payload
      }

}});

export const { setUserDetails, setOpen, setCreate, setDelete} = UserSlice.actions;

export default UserSlice.reducer;
  