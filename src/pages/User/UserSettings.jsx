import React, { useEffect } from 'react';
import LeftBar from '../../../Components/Artist/LeftBar/LeftBar'
import '../Artist/Settings/Settings.css'
// import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import NavBarArtist from '../../../Components/Artist/NavBarArtist/NavBarArtist';
import { User_Details } from '../../utils/Constants';
const LazySettings=React.lazy(()=>import('../../../Components/Artist/Settings/UserSettings'))


const userId = Cookies.get('id');
const getUserDetails = async () => {
  try{
        var token = Cookies.get('jwt_user');
        const response = await axios.get(`${User_Details}${userId}`,{ headers: { 
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
    getUserDetails();
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