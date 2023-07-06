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
import { Artist_Details, Artist_Profile_Update } from '../../../utils/Constants';
// import { setChangeArtistName } from '../../../Redux/Artist/artistnameSlice';
import { useNavigate } from 'react-router-dom';

function EditDetails() {


  const [artistName, setArtistName] = useState("");
  const [artistEmail, setArtistEmail] = useState("");
  const [place, setPlace] = useState("");
  const [artistPhoneNumber, setPhoneNumber] = useState("");
  // const [userBio,setUserBio]=useState("")
  const [loading, setLoading] = useState(false);
  const [formError,setFormError]=useState({artistNameError:false,
    artistEmailError:false,placeError:false,artistPhoneNumberError:false})

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artistId = Cookies.get('id');
  const [body, setBody] = useState({
    artistname: '',
    place: '',
    phone_number: ''
  });

  // const getArtistDetails = async () => {
  //   try{
  //         var token = Cookies.get('jwt_artist');
  //         const response = await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
  //           'Authorization': `Bearer ${token}`,
  //           "Content-Type": "application/json", 
  //           }
  //         })          
  //         console.log(response.data.data,'ppppppppppppppp');
  
  //     }
  //     catch(err){
  //         console.log("decode error",err)
  //     }
  // }

  const updateArtistPrimaryDetails = async () => {
    try{
          var token = Cookies.get('jwt_artist');
          const response = await axios.patch(`${Artist_Profile_Update}${artistId}`,body,
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

  const getArtistPrimaryData = async () => {
    const artistId = Cookies.get('id')

    try{

      var token = Cookies.get('jwt_artist');
      const response =await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
        }
      })
      console.log(response.data.data,"got the details");
      const data = response.data.data
      setArtistName(data?.artistname || "");
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
    if (field === 'artistName') {
      if(data.trim()===""){
         setFormError({artistNameError:true})
      }else{

        setFormError({artistNameError:false})
      }
      setArtistName(data)
      setBody(prevBody => ({ ...prevBody, artistname: data }));

    } else if (field === 'place') {
      if (data.trim() === "") {
        setFormError({placeError:true})
      }else{
        setFormError({placeError:false})

      }
      setPlace(data)
      setBody(prevBody => ({ ...prevBody, place: data }));

    }
    // else if(field === 'Bio'){
    //   if(data.trim() ==="" || userBio.trim().length > 10){
    //     setFormError({userBioError:true})
    //   }else{
    //     setFormError({userBioError:false})

    //   }
    //   setUserBio(data)
    // } 
    else {
      if(data.trim().length< 0 || data.trim().length > 10){
        setFormError({artistPhoneNumberError:true})
      }else{
        setFormError({artistPhoneNumberError:false})
        
      }
      setPhoneNumber(data)
      setBody(prevBody => ({ ...prevBody, phone_number: data }));

    }
  }

 async function  handleSaveDetails () {
    if (artistName === "" || place === "" || artistPhoneNumber === "") {
      return toast.err("Please Fill the components")
    }
    setLoading(true)

    try {
      const artistId = Cookies.get('id');
      const response = await updateArtistPrimaryDetails(artistId,body)
      // setArtistName(response.data.data.artistname);
      // dispatch(setChangeArtistName(response?.data?.data?.artistname))
      // setArtistEmail(response.data.email);
      // setPhoneNumber(response.data.phone_number);
      // setPlace(response.data.place);
      toast.success("Profile updated successfully");
      navigate(`/profile/${artistId}`)
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error("Ops Something went wrong")
    }
  }

  useEffect(() => {
    getArtistPrimaryData();
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
        <FormLabel>Artist Name</FormLabel>
        <Input placeholder="Artist name" type="text" value={artistName} onChange={(e) => handleDetailsChange("artistName", e.target.value)} />
        {formError.artistNameError && <p style={{ color: "red" }}>Name Field is Required</p>}
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
        <Input placeholder="Phone Number" type="number" value={artistPhoneNumber} onChange={(e) => handleDetailsChange("phoneNumber", e.target.value)} />
        {formError.artistPhoneNumberError && <p style={{ color: "red" }}>Phone Field is Required</p>}
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
        >
          <span typeof="button" onClick={()=>handleSaveDetails(artistId,body)}>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
    <Toaster />
  </Box>
  
  )
}

export default EditDetails