import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: []
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    storePosts: (state, action) => {
      state.posts = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    }
  },
});

export const { storePosts, login, logout, selectImage, resetImage } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectPosts = (state) => state.app.posts;
export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;
