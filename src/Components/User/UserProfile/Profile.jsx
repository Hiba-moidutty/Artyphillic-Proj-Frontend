import React, { useEffect, useState } from 'react'
import '../../Artist/Profile/Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast, { Toaster } from 'react-hot-toast';
import { Stack } from '@mui/material';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { User_Details, addUserCoverPhoto } from '../../../utils/Constants';
import axios from '../../../utils/axios';
import AddProfileModal from '../../Artist/Modal/AddProfileModal';
import ProfileEditButton from '../../Artist/Modal/ProfileEditButton';
// import ViewMyOrders from '../UserPosts/ViewMyOrders';
import { setCoverPic, setUserProfileImage } from '../../../Redux/User/usernameSlice';
import UserBookedEvents from '../Modals/UserBookedEvents';

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
  const {userId} = useParams();

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userdetails,setUserDetails] = useState([]);
  // const profilePic = useSelector((state) => state.artistname?.artistDetails?.profile_img);
  // console.log(profilePic,"huhuuuhuhuhuhuhuhuh")
  // const artist_id = useSelector((state) => state.artistname.artistDetails.id);
  // const artistdetails = useSelector((state) => state.artistname?.email)
  
  const user_id = Cookies.get('id')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setPreview(null) }
  const [coverPicture, setCoverPicture] = useState("");
  const [coverLoading, setCoverLoading] = useState(false)
  const [openCover, setOpenCover] = useState(false);
  const handleOpenCover = () => setOpenCover(true);
  const handleCloseCover = () => setOpenCover(false);

  const [profilePicture, setProfilePicture] = useState("");
  const [previewPro, setPreview] = useState(null);
  const [openModal,setOpenModal] = useState(false)


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
      return toast.error("oops cannot send null image")
    }
    setCoverLoading(true)
    const formData = new FormData();
    formData.append('cover_img', coverPicture);
    try {
      const response = await axios.post(`${addUserCoverPhoto}${userId}`,formData)
      setCoverLoading(false)
      handleCloseCover();
      setCoverPicture(response?.data.profile_picture_url); // Update the cover picture
      // dispatch(setCoverPic(response?.data.profile_picture_url))
      toast.success("USER COVER PICTURE ADDED")
    } catch (err) {
      setCoverLoading(false);
      handleCloseCover();
      toast.error("Oops Something went wrong")
    }
  }


  const getUserDetails = async () => {
    try{
          var token = Cookies.get('jwt_user');
          const response = await axios.get(`${User_Details}${userId}`,{ headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", 
            }
          })  
          
          console.log(response.data,'detaaaaaaails hereeeeee');
          setUserDetails(response.data.data)        
      }
      catch(err){
          console.log("decode error",err)
      }
  } 


  // const handleImageSumbit = async (e) => {
  //   e.preventDefault();
  //   if (profilePicture === "") {
  //     return alert("oops cannot send null image")
  //   }

  //   const formData = new FormData();
  //   formData.append('image', profilePicture);
  //   try {
  //     const response = await addArtistProfileImage(artistId,formData);
  //     handleClose();
  //       dispatch(setUserProfileImage(response?.data.profile_image))
  //       toast.success("USER IMAGE UPDATED")
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err?.response?.data?.message)
  //   }
  // }

  useEffect(() => {
    getUserDetails(userId);
  }, []) 

  

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 8 }}>
          <div className="home">
            <div className="profile">
              <div className="images">
              <img
                  src={decodeURIComponent(userdetails.cover_img).replace('/https:', 'https:')}
                    alt=""
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    // className="cover"
                    onClick={handleOpenCover}
                  />
              <img
                src={decodeURIComponent(userdetails.profile_img).replace('/https:', 'https:')}
                alt=""
                className="profilePic"
                onClick={() => setOpenModal(true)}
              />
                {user_id === userId ? (<AddProfileModal setOpenModal={setOpenModal} openModal={openModal} userId={userId}/>) : null}
                
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
                          {
                            coverLoading ? (<LoadingButton loading variant="outlined">
                              Submit
                            </LoadingButton>) :
                              <Button variant="contained" size="small" type='submit'>
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
                        <span style={{ marginTop: "100px" }}>{userdetails.username}</span>
                      </Stack>

                    </Box>
                    <Box>
                      {/* {artistdetails?.gender} / {artistdetails?.userBio} */}
                    </Box> 
                    <Stack direction="row" justifyContent="end">
                    {user_id === userId ? <ProfileEditButton userId={userId} token={userId} /> : null}
                    </Stack>
                    <div className='details'>
                    </div>
                  </div>
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                      {user_id.toString() === userId.toString() && [
          <Tab key="1" label="My Orders" value="1" />,
          <Tab key="2" label="My BookedEvents" value="2" />,
        ]}
                  </TabList>
                </Box>
      {value === '1' && user_id.toString() === userId.toString() && (
        <TabPanel value="1">
          <div className="userPosts">
            {/* Render your orders component here */}
            {/* <ViewMyOrders user_Id={user_id} /> */}
          </div>
        </TabPanel>
      )}
      {value === '2' && user_id.toString() === userId.toString() && (
        <TabPanel value="2">
          <div className="userPosts">
            {/* Render your orders component here */}
            <UserBookedEvents user_Id={user_id} />
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