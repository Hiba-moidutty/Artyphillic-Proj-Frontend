import React, { useEffect } from 'react';
import '../Artist/Settings/Settings.css'
// import { fetchUserDetails } from '../../../api/UserServices'
// import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading'
import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import NavAppBar from '../../Components/User/NavAppBar/NavAppBar';
import LeftAppBar from '../../Components/User/LeftAppBar/LeftAppBar';
import { User_Details } from '../../utils/Constants';
const LazySettings=React.lazy(()=>import('../../Components/User/UserSettings/UserSettings'))

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


function UserSettingsPage() {
  useEffect(()=>{
    getUserDetails();
  },[])

  return (
    <div>
      <NavAppBar/>
      <div style={{ display: "flex" }}>
        <LeftAppBar/>
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

export default UserSettingsPage