import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:null,
  token:null,
  is_authenticated:false,
}

const adminnameSlice = createSlice({
  name:"admin",
  initialState,
  reducers:{
    setAdminLogin : (state,action)=>{
      state.email=action.payload;
      state.token=action.payload;
    },
    setAdminAuth : (state,action)=>{
      state.is_authenticated=action.payload;
    },
    setAdminLogout : (state,action)=>{
      state.email=action.payload;
      state.token=action.payload;
    }
  }
})

export const{ setAdminLogin, setAdminAuth, setAdminLogout} = adminnameSlice.actions;
export default adminnameSlice.reducer;