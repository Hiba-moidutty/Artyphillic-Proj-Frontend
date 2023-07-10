import React from 'react'
import Profile from '../../Components/User/UserProfile/Profile'
import NavAppBar from '../../Components/User/NavAppBar/NavAppBar'
import LeftAppBar from '../../Components/User/LeftAppBar/LeftAppBar'
import { useParams } from 'react-router-dom';

function UserProfile() {

  const {userId} = useParams();


  return (
    <div>
      <NavAppBar />
      <div style={{ display: "flex" }}>
      <LeftAppBar />
      <div style={{flex : 6}}>
        <div className='profile'>
        <Profile userId={userId} />
      </div>
      </div>
      </div>     
    </div>
  )
}

export default UserProfile