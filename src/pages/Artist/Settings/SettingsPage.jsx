import React, { useEffect } from 'react';
import LeftBar from '../../../Components/Artist/LeftBar/LeftBar'
import './Settings.css'
// import { fetchUserDetails } from '../../../api/UserServices'
// import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { Artist_Details } from '../../../utils/Constants';
import NavBarArtist from '../../../Components/Artist/NavBarArtist/NavBarArtist';
const LazySettings=React.lazy(()=>import('../../../Components/Artist/Settings/UserSettings'))

const artistId = Cookies.get('id');
const getArtistDetails = async () => {
  try{
        var token = Cookies.get('jwt_artist');
        const response = await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json", 
          }
        })          
    }
    catch(err){
        console.log("decode error",err)
    }
}


function SettingsPage() {
  useEffect(()=>{
    getArtistDetails();
  },[])

  return (
    <div>
      <NavBarArtist/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 8 }}>
      <div className="settingsStyle">
      {/* fallback={<SkeletonLoading/>} */}
        <React.Suspense >
          <LazySettings/>
        </React.Suspense>
      </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage