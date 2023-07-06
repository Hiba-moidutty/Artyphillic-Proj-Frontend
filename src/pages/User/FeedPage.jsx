import React from 'react'
import NavBar from '../../Components/Admin/NavBar'
import NavAppBar from '../../Components/User/NavAppBar/NavAppBar'
import LeftAppBar from '../../Components/User/LeftAppBar/LeftAppBar'

function FeedPage() {
  return (
    <div>
      <NavAppBar/>
      <div style={{ display: "flex" }}>
      <LeftAppBar />
      </div>
      
      </div>
  )
}

export default FeedPage