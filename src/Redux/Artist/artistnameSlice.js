import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  email:null,
  name:null,
  token:null,
  artistDetails: null,
  is_authenticated:false,
  explorePosts:[],
  profile_image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  cover_image:"https://cdn.pixabay.com/photo/2017/12/28/15/06/geometric-3045402_1280.png"
}

const artistnameSlice = createSlice({
  name:"artist",
  initialState,
  reducers:{
    setArtistLogin : (state,action)=>{
      console.log(action.payload,'ggggggggggggggggg')
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.profile_image = action.payload.profile_img;
      state.cover_image = action.payload.cover_img;
    },

    setArtistDetails: (state,action)=>{
      console.log(action.payload,"payload data")
      state.artistDetails = action.payload;
    },

    setArtistAuth : (state,action)=>{
      state.is_authenticated = action.payload;
    },

    setChangeArtistName : (state,action)=>{
      state.name = action.payload.name
    },

    setArtistLogout : (state)=>{
      return initialState
      // state.email = null;
      // state.name = null;
      // state.token = null;
      // state.artistDetails= null;
      // state.explorePosts=[];
    },

    setArtistProfileImage : (state,action)=>{
        state.profile_image = action.payload;
        state.cover_image = action.payload;
      },

    setExplorePosts:(state,action)=>{
      const newPosts = action.payload;
      const updatedPosts = newPosts.filter(post => !state.explorePosts.some(artpost => artpost._id === post._id));
        state.explorePosts = [...state.explorePosts,...updatedPosts];
      },
    }
  }
)

export const{setArtistLogin, setArtistDetails, setArtistAuth, setArtistLogout, setExplorePosts, setArtistProfileImage,setChangeArtistName} = artistnameSlice.actions;
export default artistnameSlice.reducer;