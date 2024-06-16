import { createSlice, createNextState } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      const { videoId } = action.payload;
      const currentVideo = state.currentVideo;
    
      if (currentVideo && currentVideo._id === videoId) {
        if (!currentVideo.likes.includes(state.userId)) {
          currentVideo.likes.push(state.userId);
          currentVideo.dislikes = currentVideo.dislikes.filter(
            (id) => id !== state.userId
          );
        }
      }
    },
    dislike: (state, action) => {
      const { videoId } = action.payload;
      const currentVideo = state.currentVideo;
    
      if (currentVideo && currentVideo._id === videoId) {
        if (!currentVideo.dislikes.includes(state.userId)) {
          currentVideo.dislikes.push(state.userId);
          currentVideo.likes = currentVideo.likes.filter(
            (id) => id !== state.userId
          );
        }
      }
    },
    favourite: (state, action) => {
      const { videoId } = action.payload;
      const currentVideo = state.currentVideo;
    
      if (currentVideo && currentVideo._id === videoId) {
        if (!currentVideo.likes.includes(state.userId)) {
          currentVideo.favourite.push(state.userId);
          currentVideo.dislikes = currentVideo.dislikes.filter(
            (id) => id !== state.userId
          );
        }
      }
    },
    disfavourite: (state, action) => {
      const { videoId } = action.payload;
      const currentVideo = state.currentVideo;
    
      if (currentVideo && currentVideo._id === videoId) {
        if (!currentVideo.dislikes.includes(state.userId)) {
          currentVideo.dislikes.push(state.userId);
          currentVideo.favourite = currentVideo.favourite.filter(
            (id) => id !== state.userId
          );
        }
      }
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  favourite,
  disfavourite,
  fetchFailure,
  like,
  dislike,
} = videoSlice.actions;

export default videoSlice.reducer;