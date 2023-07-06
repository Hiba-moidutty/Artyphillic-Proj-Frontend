import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function UserProtected() {
  
  const auth=useSelector((state)=>state.user.is_authenticated)
  // console.log(auth,'jjjjjj');
  if (!auth){ 
    return <Navigate to={'/'} />
  }
  return <Outlet/>

}

export default UserProtected