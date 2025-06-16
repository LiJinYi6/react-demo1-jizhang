import billList from './modules/billStore'
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    billList
  }
});

export default store;