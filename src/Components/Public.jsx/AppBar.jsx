import {AppBar,Toolbar,Typography,styled,alpha,InputBase,Box,Tooltip,
  IconButton,MenuItem,Avatar,Menu,Button,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

const settings = ['Profile', 'Dashboard', 'Logout'];

const Logo = styled('img')(({ theme }) => ({
  width: '5rem',
  minWidth: '4rem',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // minWidth:'300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add a scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar position='fixed' className={`header ${isScrolled ? 'scrolled' : ''}`}
    style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar className='toolbar'>
        <Logo />
        {/* <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}

        {/* Menus */}

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
              {/* <MenuItem  component = { Link }
              to ={`/${page.toLowerCase().replace(/\s+/g,'-')}`} 
              onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>{page}</Typography>
              </MenuItem> */}
          </Menu>
        </Box>
        <Typography
          variant='h5'
          noWrap
          component='a'
          href=''
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
        ARTYPHILIC
        </Typography>
        <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } ,justifyContent:'left', alignItems: "center"}}>
        <span
          variant='h5'
          component='a'
          href=''
          style={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 900,
            letterSpacing: '.3rem',
            color: 'inherit',
            my:'2px',
          }}
        >
        ARTYPHILIC
        </span>
            <Button
              component = { Link }
              to ="/artistsignup"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}>
              SignUp as an Artist
            </Button>
            <Button
              component = { Link }
              to ="/signup"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}>
              SignUp as User
            </Button>
            <Button
              component = { Link }
              to = "/artistlogin"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}>
              Login 
            </Button>
        </Box>
        {/* <Box sx={{ flexGrow: 1 }}>
          <Tooltip title='Help'>
            <IconButton disableRipple={true} style={{ color: '#f68f62' }}>
              <QuestionMarkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Notifications'>
          <IconButton disableRipple={true} style={{ color: '#f68f62' }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title='Messages'>
          <IconButton  disableRipple={true} style={{ color: '#f68f62' }}>
            <NearMeOutlinedIcon />
          </IconButton>
          </Tooltip>
        </Box> */}

        {/* Profile menu */}
        {/* <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Profile settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;