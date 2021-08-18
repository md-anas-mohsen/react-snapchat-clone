import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase';
import firebase from 'firebase';

const initialState = {
  image: null,
  loading: false
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    resetImage: (state) => {
      state.image = null;
      state.loading = false;
    },
    sendImage: (state, action) => {
      const id = uuid();
      state.loading = true;
      const uploadTask = storage.ref(`posts/${id}`).putString(state.image, 'data_url');
      uploadTask.on('state_changed', null, (error) => {
        console.log(error);
      },
      () => {
        storage.ref('posts').child(id).getDownloadURL()
        .then((url) => {
          db.collection('posts').add({
            imageUrl: url,
            username: action.payload.username,
            profilePic: action.payload.profilePic,
            read: false,
            timestamp: firebase.firestore.Timestamp.now().seconds*1000
          });
        });
      });
    },
  },
});

export const { setImage, resetImage, sendImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.image;
export const loading = (state) => state.camera.loading;

export default cameraSlice.reducer;