import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const billStore = createSlice({
  name: 'billStore',
  initialState: {  
    billList:[]
   },
  reducers:{
    setBillList(state,action){
        state.billList = action.payload;
    },
    addBillList(state,action){
        state.billList.push(action.payload)
    }
  }
})

export const asyncSetBillList = ()=>{
    return async (dispatch)=>{
        const response = await axios.get('http://localhost:3001/billList');
        dispatch(billStore.actions.setBillList(response.data));
    }
}
export const {setBillList, addBillList} = billStore.actions
export default billStore.reducer;