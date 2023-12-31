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
import EditPostModal  from '../Modal/EditPost'
// import { setPosts } from '../../../redux/userSlice';
// import PostReportModal from '../modals/ReportPostModal';
import axios from '../../../utils/axios';
import { Delete_Post } from '../../../utils/Constants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function PostMenuButton({postId,postedArtistId,artistId,content,postImage}) {


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
         const response=await axios.delete(`${Delete_Post}${postId}`)
          // dispatch(setPosts(response.data.posts))
         handleClickClose();
         handleClose();
        }catch(err){
            console.log(":userpost delete error",err)
        }
    }  

  

  return (
   <>
    {
        postedArtistId == artistId ? <Menu
        id="basic-menu"
        anchorEl={anchorEl} 
        open={open}
        onClose={handleClose}   
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <EditPostModal postId={postId} postedArtistId={postedArtistId} artistId={artistId} content={content} postImage={postImage} />
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
            Once Post deleted Cannot be retreived!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleDeletePost}>Accept</Button>
        </DialogActions>
      </Dialog>
      </Menu> 
      :
      <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >Report Post
      {/* <PostReportModal postId={postId} postedArtistId={postedUserId} artistId={userId} /> */}
    </Menu>
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

export default PostMenuButton