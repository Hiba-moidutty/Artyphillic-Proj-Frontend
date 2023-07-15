import React, { useEffect, useState } from 'react'
import './Profile.css';
import { useDispatch , useSelector} from 'react-redux';
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
import LoadingButton from '@mui/lab/LoadingButton';
import UserPosts from '../UserPosts/UserPosts';
import { useParams } from 'react-router-dom';
import { Artist_Details, addArtistCoverPhoto } from '../../../utils/Constants';
import axios from '../../../utils/axios';
import AddProfileModal from '../Modal/AddProfileModal';
import ProfileEditButton from '../Modal/ProfileEditButton';
import ArtistEvents from '../Events/ArtistEvents';
import ArtistOrders from '../UserPosts/ArtistOrders';
import ViewMyOrders from '../UserPosts/ViewMyOrders';
import UserBookedEvents from '../Events/UserBookedEvents';
import ArtistBookedEvents from '../Events/ArtistBookedEvents';
import { setArtistCoverPic } from '../../../Redux/Artist/artistnameSlice';

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
  console.log(artistId,'kkkkkkkkkkkk');

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [artistdetails,setArtistDetails] = useState([]);
 // Access the cover_image and profile_image values from Redux store
 const coverPic = useSelector((state) => state.artist.cover_image);
 const profilePic = useSelector((state) => state.artist.profile_image);

  const artist_id = Cookies.get('id')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setPreview(null) }
  const [profilePicture, setProfilePicture] = useState("");
  const [previewPro, setPreview] = useState(null);
  const [openModal,setOpenModal] = useState(false);

  const [coverPicture, setCoverPicture] = useState("");
  const [coverLoading, setCoverLoading] = useState(false)
  const [openCover, setOpenCover] = useState(false);
  const handleOpenCover = () => setOpenCover(true);
  const handleCloseCover = () => setOpenCover(false);
  const dispatch = useDispatch();


  const handleChangeImg = (e) => {
    setProfilePicture(e.target.files[0]);
    setPreview(e.target.files[0])
  }

  const handleChangeCoverImg = (e) => {
    setCoverPicture(e.target.files[0]);
  }

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    if (coverPicture === "") {
      return toast.error("Oops cannot send null image")
    }
    setCoverLoading(true)
    const formData = new FormData();
    formData.append('cover_img', coverPicture);
    try {
      const response = await axios.post(`${addArtistCoverPhoto}${artistId}`,formData)
      setCoverLoading(false)
      handleCloseCover();
      setCoverPicture(response?.data.cover_picture_url); // Update the cover picture
      dispatch(setArtistCoverPic(response?.data.cover_picture_url))
      toast.success("COVER PICTURE ADDED")
    } catch (err) {
      setCoverLoading(false);
      handleCloseCover();
      toast.error("Oops Something went wrong")
    }
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
          console.log("decode error  artist",err)
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
              {coverPic ? <img
                  src={decodeURIComponent(coverPic).replace('/https:', 'https:/')}
                    alt=""
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    // className="cover"
                    onClick={handleOpenCover}
                  /> : 
                  <img
                  src={decodeURIComponent(artistdetails.cover_img).replace('/https:', 'https:/')}
                    alt=""
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    // className="cover"
                    onClick={handleOpenCover}
                  />
                  }
                {/* } */}
              {profilePic ? <img
                src={decodeURIComponent(profilePic).replace('/https:', 'https:/')}
                alt=""
                className="profilePic"
                onClick={() => setOpenModal(true)}
              /> : <img
              src={decodeURIComponent(artistdetails.profile_img).replace('/https:', 'https:/')}
              alt=""
              className="profilePic"
              onClick={() => setOpenModal(true)}
            />}
                {artist_id === artistId ? (<AddProfileModal setOpenModal={setOpenModal} openModal={openModal} artistId={artistId}/>):null}
                
                <Modal                                            //MODAL FOR COVER PICTURE CHANGE
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openCover}
                  onClose={handleCloseCover}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500, 
                    },
                  }}
                >
                  <Fade in={openCover}>
                    <Box sx={style} borderRadius={5}>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                        ADD COVER PICTURE
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleCoverSubmit}>
                          <label htmlFor="myfile">Select a file: </label>
                          <input accept="image/*" type="file" name="file" onChange={handleChangeCoverImg} />
                          <br />
                          <br />
                          {
                            coverLoading ? (<LoadingButton loading variant="outlined">
                              Submit
                            </LoadingButton>) :
                              <Button variant="contained" size="small" type='submit' >
                                Submit
                              </Button>
                          }
                        </form>
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
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