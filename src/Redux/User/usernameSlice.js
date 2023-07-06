import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:null,
  name:null,
  token:null,
  is_authenticated:false
}

const usernameSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setLogin : (state,action)=>{
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    setUserAuth : (state,action)=>{
      state.is_authenticated = action.payload;
    },
    setUserLogout : (state,action)=>{
      return initialState
      // state.email = null;
      // state.name = null;
      // state.token = null;
    }
  }
})

export const{setLogin, setUserAuth, setUserLogout} = usernameSlice.actions;
export default usernameSlice.reducer;