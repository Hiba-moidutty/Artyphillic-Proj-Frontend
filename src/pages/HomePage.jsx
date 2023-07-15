import React from 'react'
import AppBar from '../Components/Public.jsx/AppBar';
import ImageCarousel from '../Components/Public.jsx/ImageCarousel';

function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <AppBar />
    </div>
  )
}

export default HomePage;