import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from '@reduxjs/toolkit';


const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      const subscribedUsers = new Set(state.currentUser.subscribedUsers);
      if (subscribedUsers.has(action.payload)) {
        subscribedUsers.delete(action.payload);
      } else {
        subscribedUsers.add(action.payload);
      }

      state.currentUser = {
        ...state.currentUser,
        subscribedUsers: [...subscribedUsers],
      };
    },
    updateAvatar: (state, action) => {
      state.currentUser.avatar = action.payload; 
    },
    updateName: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        name: action.payload,
      };
    },
    updateNameid: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        nameid: action.payload,
      };
    },
    updateNametd: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        nametd: action.payload,
      };
    },
  },
});

export const selectIsLoggedIn = createSelector(
  (state) => state.user.currentUser,
  (currentUser) => currentUser !== null
);

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
  updateName,
  updateAvatar,
  updateNameid,
  updateNametd
} = UserSlice.actions;

export default UserSlice.reducer;