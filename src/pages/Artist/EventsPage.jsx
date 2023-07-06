import React from 'react'
import NavBarArtist from '../../Components/Artist/NavBarArtist/NavBarArtist';
import LeftBar from '../../Components/Artist/LeftBar/LeftBar';
import Events from '../../Components/Artist/Events/Events';


function EventsPage() {
  
  return (
    <div>
      <NavBarArtist />
      <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{flex : 6}}>
        <div className='home'>
        <Events />
      </div>
      </div>
      </div>
    </div>
  )
}

export default EventsPage