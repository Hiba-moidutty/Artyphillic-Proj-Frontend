import React,{ useState, useEffect} from 'react';
import "./UserList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from '../../utils/axios';
import { Order_List } from "../../utils/Constants";

function List(){
  const [orders,setOrders] = useState([])

  useEffect(()=>{
      getOrderList();
    })

  const getOrderList=()=>{
    axios.get(Order_List).then((response)=>{
      setOrders(response.data)
    }).catch((error)=>
    console.log('errrrrorrrr'))
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sl.No</TableCell>
            <TableCell className="tableCell">Order Id</TableCell>
            <TableCell className="tableCell">User Name</TableCell>
            <TableCell className="tableCell">Artist Name</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            {/* <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={orders.id}>
              <TableCell className="tableCell">{orders.id}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{orders.customer}</TableCell>
              <TableCell className="tableCell">{orders.date}</TableCell>
              <TableCell className="tableCell">{orders.amount}</TableCell>
              <TableCell className="tableCell">{orders.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${orders.status}`}>{orders.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;