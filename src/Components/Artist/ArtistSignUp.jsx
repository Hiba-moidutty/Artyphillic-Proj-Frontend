import React ,{ useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import toast from "react-hot-toast";
import axios from '../../utils/axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Artist_SignUp } from '../../utils/Constants';
const theme = createTheme();


function ArtistSignUp() {
  const[full_name, setArtistName] = useState("");
  const[artistname, setUserName] = useState("");
  const[email,setEmail] = useState("");
  const[phone_number,setPhone] = useState("");
  const[password,setPassword] = useState("");
  // const[place,setPlace] = useState("");
  const[artistnameError,setartistNameError] = useState("");
  const[usernameError,setUserNameError] = useState("");
  const[emailError,setEmailError] = useState("");
  const[numberError,setNumberError] = useState("");
  const[passwordError,setPasswordError] = useState("");
  // const[placeError,setPlaceError] = useState("");

  const navigate = useNavigate(); 

  const handleArtistSubmit = (e)=>{
    e.preventDefault();
    if (artistnameError || usernameError ||  emailError  ||  numberError  ||  passwordError ){
    toast.error(" Please fix the details correctly.");
    return;
    }

    const data = JSON.stringify({
      full_name,
      artistname,
      email,
      phone_number,
      password,
    
    });
    axios.post(Artist_SignUp,data,{headers:{"Content-Type":"application/json"},
    }).then((response)=>{
    toast.error(response.data);
    navigate("/userlogin");
    });
  }
  

  // const handlePlaceChange = (e) => {
  //   setPlace(e.target.value);
  //   if (!/^[A-Za-z]{4,}$/.test(e.target.value)){
  //     setPlaceError("Must contain at least 4 letters and letters only");
  //   }else{
  //     setPlaceError("");
  //   }
  // };


  const handleArtistnameChange = (e) => {
    setArtistName(e.target.value);
    if (!/^[A-Za-z]{1,}(\s?[A-Za-z]+)?$/.test(e.target.value)){
      setartistNameError("Must contain at least 4 letters and letters only");
    }else{
      setartistNameError("");
    }
  };


  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    if (!/^[A-Za-z]{3,}$/.test(e.target.value)){
      setUserNameError("Must contain at least 3 letters and letters only");
    }else{
      setUserNameError("");
    }
  };


  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)){
      setEmailError("Email is not valid");
    }else{
      setEmailError("");
    }
  };


  const handleNumberChange =(e)=>{
    setPhone(e.target.value);
    if(!/^\d{10}$/.test(e.target.value)){
      setNumberError("Phone Number is not valid");
    }
     else if (/(\d)\1{9}/.test(e.target.value)) {
    setNumberError("Phone Number cannot contain 10 consecutive same numbers");
  }else{
      setNumberError("");
    }
  };


  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)){
      setPasswordError("Password length must contains 6 letters and 1 number");
    }else{
      setPasswordError("");
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SignUp as an Artist
          </Typography>
          <Box component="form" noValidate onSubmit={handleArtistSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="artist_name"
                  value = {full_name}
                  onChange = {handleArtistnameChange}
                  label="Fullname"
                  name="artistname"
                  autoComplete="artistname"
                />
                <span className="text-danger">{artistnameError}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  value = {artistname}
                  onChange = {handleUsernameChange}
                  label="Artistname"
                  name="username"
                  autoComplete="artistname"
                />
                <span className="text-danger">{usernameError}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value = {email}
                  onChange = {handleEmailChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <span className="text-danger">{emailError}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  value ={phone_number}
                  onChange = {handleNumberChange}
                  label="Phone Number"
                  name="phone number"
                  autoComplete="phonenumber"
                />
                <span className="text-danger">{numberError}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange = {handlePasswordChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <span className="text-danger">{passwordError}</span>
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="place"
                  value={place}
                  onChange = {handlePlaceChange}
                  label="place"
                  type="place"
                  id="place"
                  autoComplete="new-password"
                />
                <span className="text-danger">{placeError}</span>
              </Grid> */}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {!full_name || !artistname ||  !email || !phone_number || !password  }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default ArtistSignUp

