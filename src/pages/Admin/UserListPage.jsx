import React from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import NavBar from '../../Components/Admin/NavBar'
import UserList from '../../Components/Admin/UserList'

function UserListPage() {
  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='listContainer'>
      <div className='listTitle'>User Management</div>
        <UserList />
      </div>
      </div>
      </div>
  )
}

export default UserListPage