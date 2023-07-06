import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function AdminPublic() {
  const admin=useSelector((state)=>state.admin.is_authenticated)
  console.log(admin,'oooooooo');
  if (admin) { 
    return <Navigate to={'/dashboard'}/>
   }
  return <Outlet/>
}

export default AdminPublic