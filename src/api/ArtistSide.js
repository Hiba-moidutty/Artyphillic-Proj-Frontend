import axios from '../utils/axios';
import { ArtistPost_list, Artist_Details } from '../utils/Constants';
import Cookies from 'js-cookie';
import { setArtistLogin } from '../Redux/Artist/artistnameSlice';


// export const getArtistDetails = async (artistId) => {
//   try{
//     console.log(artistId,'ooooooooooooo');
//         var token = Cookies.get('jwt_artist');
//         const artistId = Cookies.get('id')
//         const response = await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
//           'Authorization': `Bearer ${token}`,
//           "Content-Type": "application/json", 
//           }
//         })
//         const artistDetails = response.data;  
//         store.dispatch(setArtistLogin({
//                 artist:artistDetails,
//                 token:token,
//             }));           
//     }
//     catch(err){
//         console.log("decode error",err)
//     }
// } 


// export const sendOtpRequest =async(body)=>{
//     try{
//         const response=await instance.post(SEND_OTP_REQUEST,body)
//         return response
//     }catch(err){
//         throw err
//     }
// }

export const getArtistPosts = async (artistId) => {
  try {
    const response = await axios.get(`${ArtistPost_list}${artistId}`)
    return response.data.data;
  } catch (err) {
    console.log(err)
    console.log("error is getting user posts profile")
    return[];
  }
};

export const addArtistProfileImage = async (artistId) =>{
  try {
    const response = await axios.get(`${Artist_Profile_Pic}${artistId}`)
    return response.data
  }catch(error){
    throw error
  }
}