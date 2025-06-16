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
    }
  }
})

export const asyncSetBillList = ()=>{
    return async (dispatch)=>{
        const response = await axios.get('http://localhost:3001/billList');
        console.log(response)
        dispatch(billStore.actions.setBillList(response.data));
    }
}

export default billStore.reducer;