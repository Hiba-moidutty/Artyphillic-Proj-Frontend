import React,{ useState, useEffect } from 'react'
import "./UserList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import axios from '../../utils/axios';
import { User_List, BlockUnblockUser } from '../../utils/Constants';
import Cookies from "js-cookie";


function List(){
  const [users,setUsers] = useState([]);

  useEffect(()=>{ 
      getUserList();
  },[]);

  const getUserList = () => {
    axios.get(User_List).then((response) => {
      setUsers(response.data);
    
    }).catch((err)=>console.log("errorrrrr"))
  }

  const handleBlockUser = (id,status) => {
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
          axios.patch(`${BlockUnblockUser}${id}/`,{'status':status},{
              headers: { "Content-Type": "application/json" }
          }).then((res)=>{
              console.log(res.data,'llllllll');
              getUserList();
          })
          swal('Done' ,{
              icon: "success",
          });
      } else {
          swal("Cancelled!");
      }
  });
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sl.No</TableCell>
            <TableCell className="tableCell">First Name</TableCell>
            <TableCell className="tableCell">Last Name</TableCell>
            <TableCell className="tableCell">UserName</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Joined date </TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user,index) => (
            <TableRow key={user.id}>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{user.id}</TableCell>
              <TableCell className="tableCell">{user.first_name}</TableCell>
              <TableCell className="tableCell">{user.last_name}</TableCell>
              <TableCell className="tableCell">{user.username}</TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
              <TableCell className="tableCell">{user.created_at}</TableCell>
              <TableCell className="tableCell">
              {user.is_blocked ? (
                  <Button
                    variant="outlined"
                    color="primary"
                   style={{ width: '6rem' }}
                   onClick={() => handleBlockUser(user.id, user.is_blocked)}
                  >
                   Unblock
                 </Button>
                ) : (
                  <Button
                   variant="outlined"
                   color="secondary"
                   style={{ width: '6rem' }}
                   onClick={() => handleBlockUser(user.id)}
                  >
                   Block
                  </Button>
                 )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;