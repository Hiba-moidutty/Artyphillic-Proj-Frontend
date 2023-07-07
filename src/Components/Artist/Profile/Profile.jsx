import React, { useEffect, useState } from 'react'
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import LeftBar from '../LeftBar/LeftBar'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from "@mui/material";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast, { Toaster } from 'react-hot-toast';
import { Stack } from '@mui/material';
import Cookies from 'js-cookie';
import { setArtistLogin, setArtistProfileImage } from '../../../Redux/Artist/artistnameSlice';
import UserPosts from '../UserPosts/UserPosts';
import { useParams } from 'react-router-dom';
import { Artist_Details } from '../../../utils/Constants';
import axios from '../../../utils/axios';
import AddProfileModal from '../Modal/AddProfileModal';
import ProfileEditButton from '../Modal/ProfileEditButton';
import ArtistEvents from '../Events/ArtistEvents';
import ArtistOrders from '../UserPosts/ArtistOrders';
import ViewMyOrders from '../UserPosts/ViewMyOrders';
import UserBookedEvents from '../Events/UserBookedEvents';
import ArtistBookedEvents from '../Events/ArtistBookedEvents';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

function Profile() {
  const {artistId} = useParams();

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [artistdetails,setArtistDetails] = useState([]);
  // const profilePic = useSelector((state) => state.artistname?.artistDetails?.profile_img);
  // console.log(profilePic,"huhuuuhuhuhuhuhuhuh")
  const artist_id = Cookies.get('id')
  
  // const artist_id = useSelector((state) => state.artistname.artistDetails.id);
  // const artistdetails = useSelector((state) => state.artistname?.email)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setPreview(null) }
  const [profilePicture, setProfilePicture] = useState("");
  const [previewPro, setPreview] = useState(null);
  const [openModal,setOpenModal] = useState(false)


  const handleChangeImg = (e) => {
    setProfilePicture(e.target.files[0]);
    setPreview(e.target.files[0])
  }


  const getArtistDetails = async () => {
    try{
          var token = Cookies.get('jwt_artist');
          const response = await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", 
            }
          })  
          
          console.log(response.data,'detaaaaaaails hereeeeee');
          setArtistDetails(response.data.data)        
      }
      catch(err){
          console.log("decode error",err)
      }
  } 


  const handleImageSumbit = async (e) => {

    e.preventDefault();
    if (profilePicture === "") {
      return alert("oops cannot send null image")
    }
  

    const formData = new FormData();
    formData.append('image', profilePicture);
    try {
      const response = await addArtistProfileImage(artistId,formData);
      handleClose();
        dispatch(setArtistProfileImage(response?.data.profile_image))
        toast.success("USER IMAGE UPDATED")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  }

  useEffect(() => {
     getArtistDetails(artistId);
  }, []) 

  

  return (
    <div>
      {/* <NavBarArtist /> */}
      <div style={{ display: "flex" }}>
        {/* <LeftBar /> */}
        <div style={{ flex: 8 }}>
          <div className="home">
            <div className="profile">

              <div className="images">
              <img
                src={decodeURIComponent(artistdetails.profile_img).replace('/https:', 'https:')}
                alt=""
                className="profilePic"
                onClick={() => setOpenModal(true)}
              />
                {artist_id === artistId ? (<AddProfileModal setOpenModal={setOpenModal} openModal={openModal} artistId={artistId}/>):null}
              </div>
              <div className="profileContainer">
                {/* <CreateIcon fontSize='small' className='editIcon'/> */}
                <div className="uInfo">
                  <div className="center">
                    <Box>
                      <Stack direction={"column"} alignItems={"center"}>
                        <span style={{ marginTop: "100px" }}>{artistdetails.artistname}</span>
                      </Stack>

                    </Box>
                    <Box>
                      {/* {artistdetails?.gender} / {artistdetails?.userBio} */}
                    </Box> 
                    <Stack direction="row" justifyContent="end">
                    {artist_id === artistId ? <ProfileEditButton artistId={artistId} token={artistId} /> : null}
                    </Stack>
                    <div className='details'>
                    </div>
                  </div>
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Posts" value="1" />
                      <Tab label="Events" value="2" />
                      {artist_id.toString() === artistId.toString() && [
          <Tab key="3" label="Sold Orders" value="3" />,
          <Tab key="4" label="My Orders" value="4" />,
          <Tab key="5" label="User BookedEvents" value="5" />,
          <Tab key="6" label="My BookedEvents" value="6" />,
        ]}
                  </TabList>
                </Box>
                {value === '1' && (
        <TabPanel value="1">
          <div className="userPosts">
            {/* Render your post component here */}
            <UserPosts artistId={artistId} />
          </div>
        </TabPanel>
      )}
      {value === '2' && (
        <TabPanel value="2">
          <div className="userPosts">
            {/* Render your event component here */}
            <ArtistEvents artist_Id={artistId} />
          </div>
        </TabPanel>
      )}
      {value === '3' && artist_id.toString() === artistId.toString() && (
        <TabPanel value="3">
          <div className="userPosts">
            {/* Render your sold orders component here */}
            <ArtistOrders artist_Id={artist_id} />
          </div>
        </TabPanel>
      )}
      {value === '4' && artist_id.toString() === artistId.toString() && (
        <TabPanel value="4">
          <div className="userPosts">
            {/* Render your orders component here */}
            <ViewMyOrders artist_Id={artist_id} />
          </div>
        </TabPanel>
      )}
      {value === '5' && artist_id.toString() === artistId.toString() && (
        <TabPanel value="5">
          <div className="userPosts">
            {/* Render your orders component here */}
            <UserBookedEvents artist_Id={artist_id} />
          </div>
        </TabPanel>
      )}
      {value === '6' && artist_id.toString() === artistId.toString() && (
        <TabPanel value="6">
          <div className="userPosts">
            {/* Render your orders component here */}
            <ArtistBookedEvents artist_Id={artist_id} />
          </div>
        </TabPanel>
      )}
                </TabContext>
                </Box>
                
              </div>
            </div>
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </div>
  )
}

export default Profile