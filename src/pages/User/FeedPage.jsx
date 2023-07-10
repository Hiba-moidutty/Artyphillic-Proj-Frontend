import React from 'react'
import NavBar from '../../Components/Admin/NavBar'
import NavAppBar from '../../Components/User/NavAppBar/NavAppBar'
import LeftAppBar from '../../Components/User/LeftAppBar/LeftAppBar'
import PostList from '../../Components/User/PostList/PostList'
import RightBar from '../../Components/Artist/RightBar/RightBar'


function FeedPage() {
  return (
    <div>
      <NavAppBar/>
      <div style={{ display: "flex" }}>
      <LeftAppBar />
      <div style={{flex : 6}}>
        <div className='home'>
        <PostList />
      </div>
      </div>
      <div  style={{flex : 3}}>
        <RightBar />
      </div>
      </div>
      </div>
  )
}

export default FeedPage