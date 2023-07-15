import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:null,
  name:null,
  token:null,
  userDetails: null,
  is_authenticated:false,
  profile_image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  cover_image:"https://cdn.pixabay.com/photo/2017/12/28/15/06/geometric-3045402_1280.png"
}

const usernameSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setLogin : (state,action)=>{
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.profile_image = action.payload.profile_img;
      state.cover_image = action.payload.cover_img;
    },

    setUserDetails: (state,action)=>{
      console.log(action.payload,"payload data")
      state.userDetails = action.payload;
    },

    setUserAuth : (state,action)=>{
      state.is_authenticated = action.payload;
    },

    setUserProfilePic : (state,action)=>{
      state.profile_image = action.payload;
    },

    setUserCoverPic:(state,action)=>{
      state.cover_image = action.payload;
    },

    setUserLogout : (state,action)=>{
      return initialState
      // state.email = null;
      // state.name = null;
      // state.token = null;
    }
  }
})

export const{setLogin, setUserAuth,setUserDetails, setUserProfilePic, setUserCoverPic, setUserLogout} = usernameSlice.actions;
export default usernameSlice.reducer;