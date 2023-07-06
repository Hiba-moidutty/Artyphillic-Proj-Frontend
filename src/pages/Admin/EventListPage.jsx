import React from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import NavBar from '../../Components/Admin/NavBar'
import EventList from '../../Components/Admin/EventList'

function EventListPage() {
  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='listContainer'>
      <div className='listTitle'>Event Management</div>
        <EventList />
      </div>
      </div>
      </div>
  )
}

export default EventListPage