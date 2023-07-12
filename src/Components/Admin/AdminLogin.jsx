import {React , useState }from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setAdminLogin, setAdminAuth } from '../../Redux/Admin/adminnameSlice';
import { Admin_Login } from '../../utils/Constants';
import axios from '../../utils/axios';
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.jpg";

const theme = createTheme();

function AdminLogin() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      email,
      password,
    });
    axios.post(Admin_Login, data,{headers: { "Content-Type": "application/json"}})
    .then((response)=> {
      console.log(response);
    if (response.status != 200)
      {toast.error("Email or Password is incorrect");} 
    else {
      Cookies.set("jwt_admin",String(response.data.jwt));
      Cookies.set("role",String(response.data.role));
      Cookies.set("id",String(response.data.id));
      // toast.success("Logged Successfully");
      dispatch(setAdminLogin({ email: response.data.data }));
      // dispatch(setAdminLogin(response.data.payload));
      dispatch(setAdminAuth(true));
      navigate("/dashboard");
    }
  });
  };

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
            backgroundImage: `url(${logo})`,
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value);}}
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
                onChange={(e)=>{setPassword(e.target.value);}}
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AdminLogin;






// function AdminLogin() {
  
//   return (
//     <div>
//         <h1 style={{color:"red"}}>Hello</h1>
//     </div>
//   )
// }

// export default AdminLogin