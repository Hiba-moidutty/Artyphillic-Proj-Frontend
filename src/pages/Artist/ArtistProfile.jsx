import React from 'react'
import NavBarArtist from '../../Components/Artist/NavBarArtist/NavBarArtist';
import LeftBar from '../../Components/Artist/LeftBar/LeftBar';
import Profile from '../../Components/Artist/Profile/Profile';
import { useParams } from 'react-router-dom';


function ArtistProfile() {
  const {artistId} = useParams();
  
  return (
    <div>
      <NavBarArtist />
      <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{flex : 6}}>
        <div className='profile'>
        <Profile artistId={artistId} />
      </div>
      </div>
      </div>
    </div>
  )
}

export default ArtistProfile