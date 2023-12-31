import React,{useEffect, useState} from 'react'
import LeftBar from '../../../components/user/leftbar/LeftBar'
import { fetchUserDetails } from "../../../api/UserServices";
import { useLocation } from 'react-router-dom';
import SearchData from '../../../components/user/searchedList/SearchData';
import NewNavbar from '../../../components/user/navbar/NewNavbar';
import NoDataFound from '../../../components/user/noDataAvailable/NoDataFound';

function Searching() {

    const location=useLocation();
    const userData=location?.state?.data;
    const [users,setUsers]=useState([])


    useEffect(()=>{
        fetchUserDetails();
      },[])

      useEffect(()=>{
        setUsers(userData)
      },[userData])

   

  return (
    <div>
   <NewNavbar/>
    <div style={{ display: "flex" }}>
      <LeftBar/>
      <div style={{ flex: 8 }}>
    <div className="home">
    {
      userData.length===0 ? <NoDataFound data={"users"}/>
      :
       <SearchData users={users}/>
    }
    </div>
      </div>
    
    </div>
  </div>
  )
}

export default Searching