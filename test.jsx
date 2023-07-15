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