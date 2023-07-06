import React ,{ useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import toast,{Toaster} from 'react-hot-toast'
import axios from '../../../utils/axios'
import { Artist_Profile_Update } from '../../../utils/Constants';
import { useDispatch } from 'react-redux';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

function ProfileEditButton({artistId,token}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate=useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null); 
    };

    const [modalOpen,setModalOpan]=useState(false);
    const handleModalOpen = ()=> setModalOpan(true);
    const handleModalClose = () =>{ 
        setModalOpan(false);
        setFullname('');
        setArtistname('');
        setPlace('');
        setFullnameErr({nullValue:false,maxSize:false})
        setArtistnameErr({nullValue:false,maxSize:false})
        setPlaceErr({nullValue:false,maxSize:false})
    }
    
    const [buttonDisable,setButtonDisable] = useState(true)
    // const [fullname,setFullname] = useState('')
    // const [artistname,setArtistname] = useState('')
    // const [phonenumber,setPhoneNumber] = useState('')
    const [place,setPlace] = useState('')
    // const [fullnameErr,setFullnameErr] = useState(false)
    // const [artistnameErr,setArtistnameErr] = useState(false)
    // const [phnumberErr,setPhnumberErr] = useState(false)
    const [placeErr,setPlaceErr] = useState(false)
    const dispatch=useDispatch();

    // const handlePlaceChange = (data)=>{
    //     setPlace(data)
    //     if(data?.trim()==""){
    //         setPlaceErr({nullValue:true})
    //         setButtonDisable(true)
    //     }else if( data?.trim().length > 10){
    //         setPlaceErr({maxSize:true})
    //         setButtonDisable(true)
    //     }else{
    //         setPlace(data)
    //         setPlaceErr({nullValue:false})
    //         setButtonDisable(false)
    //     }
    // }

    const handleUpdateSubmit = async()=>{
        try{
            const body={
                place,artistId
            }
          const res = await  axios.post(Artist_Profile_Update`${artistId}`,body,{ headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" } });
          // dispatch(addUserBio(Bio)) 
          handleModalClose();
          setAnchorEl(null); 
          toast.success(res.data.message)
        }catch(err){
            toast.error("Oops Somethng went wrong")
        }
    }

  return (
    <>
    <MoreHorizIcon aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose} 
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate('/settings')}>Edit Profile</MenuItem>
       {/* {!userBio && <MenuItem onClick={handleModalOpen}>Add Bio</MenuItem>}  */}
       {/* {!place && <MenuItem onClick={handleModalOpen}>Add Place</MenuItem>}  */}
      </Menu>

      {/* <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Place and Bio 
          </Typography>
          <Box component="form"
       sx={{
        width: 500,
        maxWidth: '100%',
      }}
          noValidate
          autoComplete="off">
            <Stack marginTop={3}>

         <TextField
          id="outlined-multiline-static"
          fullWidth
         size='large'
         variant="standard"
         value={Bio}
         onChange={(e)=>handleBioChange(e.target.value)}
        />
        {BioError.nullValue && <span style={{color:"red"}}>Please Fill the column</span> }
        {BioError.maxSize && <span style={{color:"red"}}>Max CharSize is 10</span> }

         <TextField
          id="outlined-multiline-static"
          fullWidth
         size='large'
         variant="standard"
         value={place}
         onChange={(e)=>handlePlaceChange(e.target.value)}
        />
        {placeErr.nullValue && <span style={{color:"red"}}>Please Fill the column</span> }
        {placeErr.maxSize && <span style={{color:"red"}}>Max CharSize is 10</span> }
        <Stack marginTop={2}>

        <Button variant="contained" onClick={handleUpdateSubmit} disabled={buttonDisable}>Save</Button>
        </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal> */}
      <Toaster/>
    </>

  )
}

export default ProfileEditButton