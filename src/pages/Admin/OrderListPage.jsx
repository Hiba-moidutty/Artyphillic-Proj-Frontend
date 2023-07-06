import React from 'react'
import './Dashboard.css'
import SideBar from '../../Components/Admin/SideBar'
import NavBar from '../../Components/Admin/NavBar'
import OrderList from '../../Components/Admin/OrderList'

function OrderListPage() {
  return (
    <div className = "home">
      <SideBar />
      <div className='homeContainer'>
      <NavBar />
      <div className='listContainer'>
      <div className='listTitle'>Order Management</div>
        <OrderList />
      </div>
      </div>
      </div>
  )
}

export default OrderListPage