import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '@mui/joy/FormLabel'; 
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../utils/axios';
import { Add_ArtistAdress } from '../../../utils/Constants';
import { useNavigate } from 'react-router-dom';

function AddArtistAddress() {

  const [locaddress, setlocaddress] = useState("");
  const [altphonenum, setAltPhoneNum] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [landmark, setLandMark] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const[numberError,setNumberError] = useState("");
  const[pinError,setPinError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artistId = Cookies.get('id');

  const handlePhNumberChange =(e)=>{
    setAltPhoneNum(e.target.value);
    if(!/^\d{10}$/.test(e.target.value)){
      setNumberError("Phone Number is not valid");
    }
     else if (/(\d)\1{9}/.test(e.target.value)) {
    setNumberError("Phone Number cannot contain 10 consecutive same numbers");
  }else{
      setNumberError("");
    }
  };

  const handlePincodeChange =(e)=>{
    setPincode(e.target.value);
    if(!/^\d{6}$/.test(e.target.value)){
      setPinError("Phone Number is not valid");
    }
     else if (/(\d)\1{6}/.test(e.target.value)) {
      setPinError("Phone Number cannot contain 10 consecutive same numbers");
  }else{
    setPinError("");
    }
  };

  const handleSaveAddress = async (event) =>{
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('artist',artistId);
    formData.append('local_address', locaddress);
    formData.append('alt_ph_number',altphonenum);
    formData.append('state',state);
    formData.append('district',district);
    formData.append('landmark',landmark);
    formData.append('pincode',pincode);
    const token = Cookies.get('jwt_artist');

    if (locaddress === '' || state === '' || district === '' || pincode === '' ){
      console.log('empty string');
      return toast.error('Cant add an address without these details!!');
    } 
    else {
      try{
        const response = await axios.post(Add_ArtistAdress,formData,{
          headers:{Authorization : `Bearer ${token}`},
        });
        if (response.status === 201){
          setLoading(false);
          toast.success('Address added successfully');
          setlocaddress('');
          setAltPhoneNum('');
          setState('');
          setDistrict('');
          setLandMark('');
          setPincode('');
          setOpen(false)
           // Fetch the updated events list here
          //  fetchUpdatedEvents();
          // navigate('/eventslist');
        }
        else if (response.status === 400){
          toast.error('Error 400');
          navigate('/settings');
          setOpen(false)
        }
        else{
          toast.error('Failed to add event');
          setOpen(false)
          setLoading(false);
        }
      } catch (error){
      }
    }
  };


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
        <FormLabel>Local Address</FormLabel>
        <Input placeholder="Enter address" type="text" value={locaddress} onChange={(e) => setlocaddress(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormLabel>Phone Number</FormLabel>
        <Input placeholder="Phone number" type="number" value={altphonenum}  onChange={handlePhNumberChange}/>
        <span className="text-danger">{numberError}</span>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormLabel>State</FormLabel>
        <Input placeholder="Place" type="text" value={state} onChange={(e) =>setState(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormLabel>District </FormLabel>
        <Input placeholder="District" type="text" value={district} onChange={(e) => setDistrict( e.target.value)} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormLabel>LandMark</FormLabel>
        <Input placeholder="Landmark" type="text" value={landmark} onChange={(e) => setLandMark(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormLabel>Pin Code</FormLabel>
        <Input placeholder="Pincode" type="number" value={pincode} onChange={handlePincodeChange} />
        <span className="text-danger">{pinError}</span>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          color="primary"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          disabled = {!locaddress || !altphonenum ||  !state || !district || !pincode || !landmark }
        >
          <span typeof="button" onClick={handleSaveAddress}>Save Address</span>
        </LoadingButton>
      </Grid>
    </Grid>
    <Toaster />
  </Box>
  
  )
}

export default AddArtistAddress