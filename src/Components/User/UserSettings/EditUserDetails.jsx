import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '@mui/joy/FormLabel'; 
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Cookies from 'js-cookie';
// import decodeToken from '../../../utils/Services';
import { useDispatch, useSelector } from 'react-redux';
// import { changeUserName } from '../../../redux/userSlice';
import axios from '../../../utils/axios';
import { User_Details, User_Profile_Update } from '../../../utils/Constants';
import { useNavigate } from 'react-router-dom';

function EditUserDetails() {


  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [place, setPlace] = useState("");
  const [userPhoneNumber, setPhoneNumber] = useState("");
  // const [userBio,setUserBio]=useState("")
  const [loading, setLoading] = useState(false);
  const [formError,setFormError]=useState({userNameError:false,
    artistEmailError:false,placeError:false,userPhoneNumberError:false})

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = Cookies.get('id');
  const [body, setBody] = useState({
    artistname: '',
    place: '',
    phone_number: ''
  });

  const updateUserPrimaryDetails = async () => {
    try{
          var token = Cookies.get('jwt_user');
          const response = await axios.patch(`${User_Profile_Update}${userId}`,body,
          { headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", 
            }
          })          
      }
      catch(err){
          console.log("decode error",err)
      }
  }

  const getUserPrimaryData = async () => {
    const userId = Cookies.get('id')

    try{

      var token = Cookies.get('jwt_user');
      const response =await axios.get(`${User_Details}${userId}`,{ headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
        }
      })
      console.log(response.data.data,"got the details");
      const data = response.data.data
      setUserName(data?.username || "");
      // setArtistEmail(data?.email);
      setPhoneNumber(data?.phone_number || "");
      setPlace(data?.place || "");
      // setUserEmail(response.data.email);
      // setUserBio(response.data.userBio ? response.data.userBio : "")
    }catch(err){
      console.log(err );
      toast.error("Oops,didn't find the details")
    }
  }

  const handleDetailsChange = (field, data) => {
    if (field === 'userName') {
      if(data.trim()===""){
         setFormError({userNameError:true})
      }else{

        setFormError({userNameError:false})
      }
      setUserName(data)
      setBody(prevBody => ({ ...prevBody, username: data }));

    } else if (field === 'place') {
      if (data.trim() === "") {
        setFormError({placeError:true})
      }else{
        setFormError({placeError:false})

      }
      setPlace(data)
      setBody(prevBody => ({ ...prevBody, place: data }));

    }
    else {
      if(data.trim().length< 0 || data.trim().length > 10){
        setFormError({userPhoneNumberError:true})
      }else{
        setFormError({userPhoneNumberError:false})
        
      }
      setPhoneNumber(data)
      setBody(prevBody => ({ ...prevBody, phone_number: data }));

    }
  }

 async function  handleSaveDetails () {
    if (userName === "" || place === "" || userPhoneNumber === "") {
      return toast.err("Please Fill the components")
    }
    setLoading(true)

    try {
      const userId = Cookies.get('id');
      const response = await updateUserPrimaryDetails(userId,body)
      // setArtistName(response.data.data.artistname);
      // dispatch(setChangeArtistName(response?.data?.data?.artistname))
      // setArtistEmail(response.data.email);
      // setPhoneNumber(response.data.phone_number);
      // setPlace(response.data.place);
      toast.success("Profile updated successfully");
      navigate(`/profile/${userId}`)
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error("Ops Something went wrong")
    }
  }

  useEffect(() => {
    getUserPrimaryData();
  }, [])

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
  >
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormLabel>User Name</FormLabel>
        <Input placeholder="User name" type="text" value={userName} onChange={(e) => handleDetailsChange("userName", e.target.value)} />
        {formError.userNameError && <p style={{ color: "red" }}>Name Field is Required</p>}
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" value={artistEmail} disabled />
      </Grid> */}
      <Grid item xs={12} md={4}>
        <FormLabel>Place</FormLabel>
        <Input placeholder="Place" type="text" value={place} onChange={(e) => handleDetailsChange("place", e.target.value)} />
        {formError.placeError && <p style={{ color: "red" }}>Place Field is Required</p>}
      </Grid>
      <Grid item xs={12} md={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input placeholder="Phone Number" type="number" value={userPhoneNumber} onChange={(e) => handleDetailsChange("phoneNumber", e.target.value)} />
        {formError.userPhoneNumberError && <p style={{ color: "red" }}>Phone Field is Required</p>}
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <FormLabel>User Bio</FormLabel>
        <Input placeholder="Bio" type="text" value={userBio} onChange={(e) => handleDetailsChange("Bio", e.target.value)} />
        {formError.userBioError && <p style={{ color: "red" }}>Bio Field is Required(Max char 10)</p>}
      </Grid> */}
      <Grid item xs={12}>
        <LoadingButton
          color="primary"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          disabled = {!place }
        >
          <span typeof="button" onClick={()=>handleSaveDetails(userId,body)}>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
    <Toaster />
  </Box>
  
  )
}

export default EditUserDetails