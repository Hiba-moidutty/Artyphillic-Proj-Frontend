import React from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import NavBar from '../../Components/Admin/NavBar'
import PostList from '../../Components/Admin/PostList'

function PostListPage() {
  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='listContainer'>
      <div className='listTitle'>Artist's Post Management</div>
        <PostList />
      </div>
      </div>
      </div>
  )
}

export default PostListPage