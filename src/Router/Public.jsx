import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function Public() {
  const artistauth = useSelector((state)=>state.artist.is_authenticated)
  const userauth = useSelector((state)=>state.user.is_authenticated)
  // console.log(artistauth,'artistooooooooo');
  // console.log(userauth,'userooooooo');
  if (artistauth) { 
    return <Navigate to={'/artistfeed'}/>
   }
  else if (userauth) {
    return <Navigate to={'/userfeed'}/>
  }
  return <Outlet/>
}

export default Public
// export const googleAuth = async (request,response,next)=>{
//   try{
//     const artist = Artist.findOne()
//   }
// }