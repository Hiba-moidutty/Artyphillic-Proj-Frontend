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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User_SignUp } from '../../utils/Constants';
import axios from '../../utils/axios'
const theme = createTheme();


function SignUp() {
  const[first_name, setFName] = useState("");
  const[last_name, setLName] = useState("");
  const[username, setUserName] = useState("");
  const[email,setEmail] = useState("");
  const[phone_number,setPhone] = useState("");
  const[password,setPassword] = useState("");
  const[fnameError,setFNameError] = useState("");
  const[lnameError,setLNameError] = useState("");
  const[usernameError,setUserNameError] = useState("");
  const[emailError,setEmailError] = useState("");
  const[numberError,setNumberError] = useState("");
  const[passwordError,setPasswordError] = useState("");

  const navigate = useNavigate(); 
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (fnameError || lnameError || emailError ||  usernameError ||  numberError || passwordError){
    toast.error("Please fix details correctly.");
    return;
  }

  if (!first_name || !last_name ||  !username  || !email || !phone_number || !password ){
    toast.error("Please fill all the required fields.");
    return;
  }

  const data = JSON.stringify({
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
  });
  axios.post(User_SignUp,data,{headers:{"Content-Type":"application/json"},
  }).then((response)=>{
    if(response.status === 200){
      toast.error(response.data);
      navigate("/userlogin");
    }
    });
  };


  const handleFNameChange = (e) => {
    setFName(e.target.value);
    if (!/^[A-Za-z]{3,}$/.test(e.target.value)){
      setFNameError("Must contain at least 3 letters and letters only");
    }else{
      setFNameError("");
    }
  };


  const handleLNameChange = (e) => {
    setLName(e.target.value);
    if (!/^[A-Za-z]{3,}$/.test(e.target.value)){
      setLNameError("Must contain at least 3 letters and letters only");
    }else{
      setLNameError("");
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
    }
    else{
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
            SignUp as User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value = {first_name}
                  onChange={handleFNameChange}
                  label="First Name"
                  autoFocus
                />
                <span className="text-danger">{fnameError}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value = {last_name}
                  onChange = {handleLNameChange}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <span className="text-danger">{lnameError}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  value = {username}
                  onChange = {handleUsernameChange}
                  label="Username"
                  name="username"
                  autoComplete="username"
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
              disabled = { !first_name || !last_name ||  !username  || !email || !phone_number || !password } 
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default SignUp

