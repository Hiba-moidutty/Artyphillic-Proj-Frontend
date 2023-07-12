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
    },[])

  const getOrderList=()=>{
    axios.get(Order_List).then((response)=>{
      setOrders(response.data.data,'oooooooooooooorrrrdersssssssss')
    }).catch((error)=>
    console.log('errrrrorrrr'))
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" style={{fontWeight:'bold'}}>Sl.No</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Order Id</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>User</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Buyer Artist</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Seller Artist</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Post</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Ordered Date</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Order Status</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Payment Amount</TableCell>
            <TableCell className="tableCell"style={{fontWeight:'bold'}}>Payment Method</TableCell>
          
            {/* <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order,index) => (
            <TableRow key={orders.id}>
              <TableCell className="tableCell">{index+1}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{order.id}</TableCell>
              <TableCell className="tableCell">{order.user_name}</TableCell>
              <TableCell className="tableCell">{order.artist_buyername}</TableCell>
              <TableCell className="tableCell">{order.artist_sellername}</TableCell>
              <TableCell className="tableCell">{order.artist_sellername}</TableCell>
              <TableCell className="tableCell">{order.order_date}</TableCell>
              <TableCell className="tableCell">{order.order_status}</TableCell>
              <TableCell className="tableCell">{order.total_price}</TableCell>
              <TableCell className="tableCell">{order.payment_method}</TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${orders.status}`}>{orders.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;