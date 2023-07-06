import React from 'react'
import {
  AccountBox,
  Home,
  Article,
  // ModeNight,
  Person,
  Settings,
  Message,
  Logout
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Switch,
} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './LeftBar.css'
import { useNavigate } from 'react-router-dom';
import AddPost from '../../Artist/Modal/AddPost/AddPost';
import AddEvent from '../Modal/AddEvent';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { setArtistLogout,setArtistAuth } from '../../../Redux/Artist/artistnameSlice';


function LeftBar() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [open, setOpen] = React.useState(true);
  const artistId = Cookies.get('id')
  const artistname = Cookies.get('artistname')
  console.log(artistname,'name kittyyyyy');
  console.log(artistId,'id kittyyyyy');

  const handleLogout = () => {
    Cookies.remove("jwt_artist");
    Cookies.remove("role","artist");
    Cookies.remove("id");
    Cookies.remove("artistname");
    dispatch(setArtistLogout());
    dispatch(setArtistAuth(false));
    navigate("/");
  };

  return ( 
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <div className="user">
          
          <span>adharsh</span>
        </div> */}
          <div className="item">
            <List sx={{ width: '100%', maxWidth: 360, color: "black" }}>
              <ListItem >
              <AddPost />
              </ListItem>
              <ListItem >
              <AddEvent />
              </ListItem>
              <ListItem >
                <ListItemButton component="a" onClick={() => navigate('/artistfeed')}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton>
              </ListItem>
              <ListItem >
                <ListItemButton component="a" onClick={() => navigate('/eventslist')}>
                  <ListItemIcon>
                    <Article />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </ListItemButton>
              </ListItem>
              {/* <ListItem >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
          </ListItem> */}
                {/* <ListItem >
                  <ListItemButton component="a" onClick={()=>navigate('/messenger')}>
                    <ListItemIcon>
                      <Message />
                    </ListItemIcon>
                    <ListItemText primary="Messages" /> 
                  </ListItemButton>
                </ListItem> */}
              {/* <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="My Network" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton> */}
              {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" >
                  <ListItemButton sx={{ pl: 4 }} onClick={()=>navigate('/connections')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Connections" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/people-following')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Following" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}  onClick={()=>navigate('/people-followers')}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Followers" />
                  </ListItemButton>
                </List>
              </Collapse> */}
              <ListItem >
                <ListItemButton  onClick={()=>navigate('/settings')}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem  onClick={() => navigate(`/profile/${artistId}`)}>
                <ListItemButton component="a">
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>

              </ListItem>
              <ListItem  onClick={handleLogout}>

                <ListItemButton component="a">
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>

              </ListItem>
              {/* <ListItem >
                <ListItemButton component="a" href="#simple-list">
                  <ListItemIcon>
                    <ModeNight />
                  </ListItemIcon>
                  <Switch />
                </ListItemButton>
              </ListItem> */}
              
            </List>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar