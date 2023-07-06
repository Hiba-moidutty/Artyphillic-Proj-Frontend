import React from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import NavBar from '../../Components/Admin/NavBar'
import ArtistList from '../../Components/Admin/ArtistList'

function ArtistListPage() {
  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='listContainer'>
      <div className='listTitle'>Artist Management</div>
        <ArtistList />
      </div>
      </div>
      </div>
  )
}

export default ArtistListPage