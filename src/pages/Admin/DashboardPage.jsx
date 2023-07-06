import React,{useEffect} from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import Dashboard from '../../Components/admin/Dashboard'
import NavBar from '../../Components/Admin/NavBar'
import Widget from '../../Components/Admin/Widget'
import UserList from '../../Components/Admin/UserList'
// import axios from '../../utils/axios'
import { Verify_Token } from '../../utils/Constants'
import instance from '../../utils/axios'

function DashboardPage() {

  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='widgets'>
        <Widget type="user"/>
        <Widget type="order"/>
        <Widget type="earning"/>
        <Widget type="balance"/>
      </div>
      {/* <div className='listContainer'>
        <div className='listTitle'>User Management</div>
        <UserList />
      </div> */}
      </div>
      </div>
  )
}

export default DashboardPage