import React from 'react'
import Profile from '../../Components/User/UserProfile/Profile'

function UserProfile() {
  return (
    <div>
      <NavAppBar/>
      <div style={{ display: "flex" }}>
      <LeftAppBar />
      </div>
      <Profile />      
      </div>
  )
}

export default UserProfile