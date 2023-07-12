import React,{ useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { Delete_Address, Get_ArtistAddress, Get_UserAddress } from '../../../utils/Constants';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import NoDataFound from '../../Artist/NoDataAvailable/NoDataAvailable';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ViewUserAddress() {
  const [open,setOpen] = useState(false)
  const [addressess,setAddressess] = useState([]);
  const [clickOpen,SetClickOpen]=useState(false)
  const userId = Cookies.get('id');

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleClickOpen = () => {
    SetClickOpen(true);
  };
  const handleClickClose = () => {
    SetClickOpen(false);
   
  };

  const handleDeleteAddress = async (id)=>{
    try{
     await axios.delete(`${Delete_Address}${id}`)
      // dispatch(setPosts(response.data.posts))
     handleClickClose();
     toast.success('address deleted successfully');
    }catch(err){
        console.log("delete error",err)
    }
} 


  useEffect (() => {
    async function fetchAddress(){
      const response = await axios.get(`${Get_UserAddress}${userId}`);
      setAddressess(response.data.data);
      console.log(response.data,'response of addresssssss');
    }
    fetchAddress();
  },[])


  return (
    <React.Fragment>
      <div
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
      > 
      {addressess.length == 0 ?(
        <>
        <div className="post">
        <NoDataFound data={"Address"}/>
        </div>
        {/* <SkeltonLoad /> */}
        </>

    ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '' }}>
      {addressess.map((address,index)=>(
        <div key={index} sx={{ minWidth:325 , width: `${100 / 3}%`, height: '300px' ,my:4 }}>
        <Card variant="outlined" sx={{my:5 , mx:2}}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              <div className='artist-info' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {index+1}.
                  {/* <Link 
                        to={`/profile/${address.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{address.artist_name}</span>
                        </Link> */}
                        <MenuItem style={{color:"red"}} onClick={handleClickOpen}>Delete</MenuItem>
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
                                Once Address deleted cannot be retreived!!!
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClickClose}>Cancel</Button>
                              <Button onClick={() => handleDeleteAddress(address.id)}>Accept</Button>
                            </DialogActions>
                      </Dialog>
                  </div>
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold',fontSize: 14 }}>Local Address: </span>{address.local_address}
              <br />
              <span style={{ fontWeight: 'bold',fontSize: 14}}>LandMark : </span>{address.landmark}
              <br />
              <span style={{ fontWeight: 'bold',fontSize: 14}}>District/State: </span>{address.district} / {address.state}
              <br />
              <span style={{ fontWeight: 'bold',fontSize: 14}}>Pincode : </span>{address.pincode} 
              <br />
              <span style={{ fontWeight: 'bold',fontSize: 14}}>Phone Number : </span>{address.alt_ph_number} 
            </Typography>
          </CardContent>
        </Card>
      </div>
      ))}
      </div>
    )}
    <Toaster />
  </div>
    </React.Fragment>
  );
       }
export default ViewUserAddress
