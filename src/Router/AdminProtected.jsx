import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function AdminProtected() {
  
  const auth=useSelector((state)=>state.admin.is_authenticated)
  // console.log(auth,'jjjjjj');
  if (!auth){ 
    return <Navigate to={'/adminlogin'} />
  }
  return <Outlet/>

}

export default AdminProtected