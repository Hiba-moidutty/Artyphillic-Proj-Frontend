import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Artist_Login, GoogleLogin_Artist, User_Login } from '../../utils/Constants';
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { auth , provider } from '../../Firebase';
import { signInWithPopup } from 'firebase/auth';
import { setLogin , setUserAuth } from '../../Redux/User/usernameSlice';
import { setArtistLogin, setArtistAuth, setArtistProfileImage } from '../../Redux/Artist/artistnameSlice';
import { useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import loginimg from '../../assets/images/loginimg.jpg'
import artistlogimg from '../../assets/images/artistlogimg.jpg'
import GoogleButton from './GoogleButton/GoogleButton';

const theme = createTheme();

function UserLogin({userType}) {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[emailError,setEmailError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)){
      setEmailError('Invalid email');
      return;
    }
    const data = JSON.stringify({
      'email' : email,
      'password' : password,
      'user_type' : userType
    });
    const endpoint = userType === 'user' ? User_Login : Artist_Login
    axios.post(endpoint,data,{headers: { "Content-Type": "application/json"}})
    .then((response)=>{
      if (response.status != 200)
        {toast.error("Email or Password is incorrect");} 
      else {
        Cookies.set("role",String(response.data.role));
        Cookies.set(`jwt_${response.data.role}`,String(response.data.token));
        Cookies.set("id",String(response.data.id));
        // toast.success("Logged Successfully");
        if (userType === 'user') {
          console.log("aetydrdrdgrd123123123123");

          Cookies.set("username",String(response.data.name));
          dispatch(setLogin(response.data));
          // dispatch(setLogin(response.data.username));
          // dispatch(setLogin(response.data.profileImage));
          dispatch(setUserAuth(true));
          navigate("/userfeed");
        } else if (userType === 'artist') {
          console.log("aetydrdrdgrd");
        Cookies.set("artistname",String(response.data.name));
        dispatch(setArtistLogin(response.data));
        dispatch(setArtistProfileImage(response.data.profileImage));
        dispatch(setArtistAuth(true));
        navigate("/artistfeed");
        }
      }
  });
  };

  const isValidEmail = (email) =>{
    const atIndex = email.indexOf('@');
    return atIndex !== -1 && atIndex === email.lastIndexOf('@');
  }

  const artistSignInWithGoogle = async () => {
    try{
      const result = await signInWithPopup(auth,provider);
      const response = await axios.post(GoogleLogin_Artist,{
        name: result.user.displayName,
        email: result.user.email,
      })
      if (response.status == 200){
        Cookies.set("artistname",String(response.data.name));
        dispatch(setArtistLogin(response.data));
        // dispatch(setArtistLogin(response.data.artistname));
        dispatch(setArtistProfileImage(response.data.profileImage));
        dispatch(setArtistAuth(true));
        navigate("/artistfeed");
      }  
  }
    catch(error){
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: userType === 'user' ? `url(${loginimg})` : `url(${artistlogimg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '20px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            { userType === 'user' ? "User Login" : "Artist Login"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value);
                  setEmailError('');
                }}
                error = {Boolean(emailError)}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value = {password}
                onChange={(e)=>{
                  setPassword(e.target.value);
                }}
                
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {userType === 'user'?
                  <Link to="/artistlogin" variant="body2">Login as an Artist</Link> :
                  <Link to="/userlogin" variant="body2">Login as User</Link> }
                </Grid>
                <Grid item>
                  {userType === 'user'? <Link to="/signup">Don't have an Account?SignUp</Link> :
                  <Link to="/artistsignup">Don't have an Account?SignUp</Link>}
                </Grid>
              </Grid>
            </Box>
            <Button
                fullWidth
                variant="contained"
                onClick={artistSignInWithGoogle}
                sx={{ mt: 3, mb: 2 }}
              >
              <GoogleButton />
              </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default UserLogin;
