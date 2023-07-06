import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import {useDispatch} from 'react-redux'
// import { setPosts } from '../../../redux/userSlice';
// import PostReportModal from '../modals/ReportPostModal';
import axios from '../../../utils/axios';
import EditEventModal from '../Modal/EditEvent';
import { Delete_Event } from '../../../utils/Constants';
import { useNavigate } from 'react-router-dom';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EventMenuButton({ eventId, eventArtistId, artistId, eventName, eventDate, eventStart, eventEnd, totalSlots, bookingPrice}) {
  
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(false);
    const [clickOpen,SetClickOpen]=useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(false);
    };

    const handleClickOpen = () => {
        SetClickOpen(true);
      };
      const handleClickClose = () => {
        SetClickOpen(false);
       
      };

    const handleDeletePost = async ()=>{
        try{
         await axios.delete(`${Delete_Event}${eventId}`)
          // dispatch(setPosts(response.data.posts))
         handleClickClose();
         handleClose();
         toast.success('Event added successfully');
         navigate('/eventslist');
        }catch(err){
            console.log(":artristevent delete error",err)
        }
    }  

  return (
   <>
    {
        eventArtistId == artistId ? <Menu
        id="basic-menu"
        anchorEl={anchorEl} 
        open={open}
        onClose={handleClose}   
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <EditEventModal eventId={eventId} eventArtistId={eventArtistId} artistId={artistId} eventName={eventName} 
       eventDate={eventDate} eventStart={eventStart} eventEnd={eventEnd} totalSlots={totalSlots} bookingPrice={bookingPrice}/>
       
        <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
        <Dialog
        open={clickOpen}
        TransitionComponent={Transition} 
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{color:"red"}}>{"Are you sure to delete post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{color:'black'}}>
            Once Event deleted Cannot be retreived!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleDeletePost}>Accept</Button>
        </DialogActions>
      </Dialog>
      </Menu> 
      :
      null
    } 
   <MoreHorizIcon   id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  // disablebackdropclick 
  onClick={handleClick}/>
   </>
  )
}

export default EventMenuButton