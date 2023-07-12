import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:null,
  // token:null,
  is_authenticated:false,
}

const adminnameSlice = createSlice({
  name:"admin",
  initialState,
  reducers:{
    setAdminLogin : (state,action)=>{
      console.log(action.payload,'ttttttttttttt');
      state.email=action.payload?.email;
      // state.token=action.payload.token;
    },
    setAdminAuth : (state,action)=>{
      state.is_authenticated=action.payload;
    },
    setAdminLogout : (state)=>{
      return initialState
    }
  }
})

export const{ setAdminLogin, setAdminAuth, setAdminLogout} = adminnameSlice.actions;
export default adminnameSlice.reducer;