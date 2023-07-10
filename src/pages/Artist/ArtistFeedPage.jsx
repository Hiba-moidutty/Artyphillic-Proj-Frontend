import React from 'react';
import './ArtistFeedPage.css'
import NavBarArtist from '../../Components/Artist/NavBarArtist/NavBarArtist';
import LeftBar from '../../Components/Artist/LeftBar/LeftBar';
import Post from '../../Components/Artist/Post/Post'
import RightBar from '../../Components/Artist/RightBar/RightBar';

function ArtistFeedPage() {
  return (
    <div>
      <NavBarArtist />
      <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{flex : 6}}>
        <div className='home'>
        <Post />
      </div>
      </div>
      <div  style={{flex : 3}}>
        <RightBar />
      </div>
      </div>
    </div>
  )
}

export default ArtistFeedPage