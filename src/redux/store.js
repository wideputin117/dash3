// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from './slices/widgetsSlice'; 

const store = configureStore({
  reducer: {
    widgets: widgetsReducer
  }
});

export default store; // <-- Add this line to export the store