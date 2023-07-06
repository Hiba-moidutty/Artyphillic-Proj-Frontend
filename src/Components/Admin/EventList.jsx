import React,{ useState } from "react";
import "./UserList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { Event_List } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";

function EventList(){
  const [events,setEvents] = useState([])

  useEffect(()=>{
      getEventList();
    },[])

  const getEventList=()=>{
    axios.get(Event_List).then((response)=>{
      setEvents(response.data)
      console.log(response.data,'eventssssssssssssssssss');
    }).catch((error)=>
    console.log('errrrrorrrr'))
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sl.No</TableCell>
            <TableCell className="tableCell">Event Name</TableCell>
            <TableCell className="tableCell">Event Date</TableCell>
            <TableCell className="tableCell">Place</TableCell>
            <TableCell className="tableCell">Starting Time</TableCell>
            <TableCell className="tableCell">Ending Time</TableCell>
            <TableCell className="tableCell">Hoster</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((events) => (
            <TableRow key={events.id}>
              <TableCell className="tableCell">{events.id}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{events.event_name}</TableCell>
              <TableCell className="tableCell">{events.event_date}</TableCell>
              <TableCell className="tableCell">{events.event_place}</TableCell>
              <TableCell className="tableCell">{events.event_start_time}</TableCell>
              <TableCell className="tableCell">{events.event_end_time}</TableCell>
              <TableCell className="tableCell">{events.conducting_artist}</TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventList;