import React,{ useState, useEffect } from 'react'
import "./UserList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../utils/axios";
import Button from '@material-ui/core/Button';
import { Artist_List,BlockUnblockArtist } from '../../utils/Constants';

function ArtistList() {
  const [artist, setArtist] = useState([])

  useEffect (() => {
    getArtistList();
  },[])  
  
  const getArtistList =()=>{
    axios.get(Artist_List).then((response) => {
      setArtist(response.data);
    }).catch((error)=>console.log('errorrr'))
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
          axios.patch(`${BlockUnblockArtist}${id}/`,{'status':status},{
              headers: { "Content-Type": "application/json" }
          }).then((res)=>{
              // console.log(res.data,'llllllll');
              getArtistList();
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
            <TableCell className="tableCell">Sl.no</TableCell>
            <TableCell className="tableCell">Artist Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Place</TableCell>
            <TableCell className="tableCell">Joined date</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artist.map((artist,index) => (
            <TableRow key={artist.id}>
              <TableCell className="tableCell">{artist.id}</TableCell>
              <TableCell className="tableCell">{artist.artistname}</TableCell>
              <TableCell className="tableCell">{artist.email}</TableCell>
              <TableCell className="tableCell">{artist.place}</TableCell>
              <TableCell className="tableCell">{artist.created_at}</TableCell>
              <TableCell className="tableCell">
                  {artist.is_blocked ? (
                      <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: '6rem' }}
                      onClick={() => handleBlockUser(artist.id, artist.is_blocked)}
                      >
                       Unblock
                     </Button>
                    ) : (
                      <Button
                       variant="outlined"    
                       color="secondary"
                       style={{ width: '6rem' }}
                       onClick={() => handleBlockUser(artist.id)}
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

export default ArtistList;