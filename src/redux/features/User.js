import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserDetails: {},
    Msg:{
      open:false,
      name:null,
      message:null
    },
    Create:{
      open:false,
      name:null
    },
    Notexist:false
      
};

const UserSlice = createSlice({
    name: 'UserAuth',
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
          state.UserDetails = action.payload?.user
      },
      setNotexist: (state, action) => {
          state.Notexist = action.payload
      },
      SetMsg: (state, action) => {
        state.Msg.name = action.payload.name
        state.Msg.open = action.payload.open
        state.Msg.message = action.payload.message
      },
      SetCreate: (state, action) => {
        state.Create = action.payload
      },

}});

export const { setUserDetails, SetMsg, SetCreate, setNotexist} = UserSlice.actions;

export default UserSlice.reducer;
  