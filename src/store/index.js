import billStore from './modules/billStore'
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    billStore
  }
});

export default store;