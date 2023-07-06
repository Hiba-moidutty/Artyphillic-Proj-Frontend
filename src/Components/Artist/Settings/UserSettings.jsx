import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import ChangePassword from './ChangePassword';
// import SkeletonLoading from '../Loading/SkeletonLoading'
const LazyEditDetails = React.lazy(()=>import('./EditDetails'))
const LazyAddAddress = React.lazy(()=>import('./AddArtistAddress'))

function UserSettings() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Edit the Details" value="1" />
          <Tab label="Change Password" value="2" />
          <Tab label="Add Address" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
      {/* fallback={<SkeletonLoading/>} */}
        <React.Suspense  >
        <LazyEditDetails/>
        </React.Suspense>
      </TabPanel>
      <TabPanel value="2">
        {/* <ChangePassword/> */}
      </TabPanel>
      
      <TabPanel value="3">
      {/* fallback={<SkeletonLoading/>} */}
        <React.Suspense  >
        <LazyAddAddress/>
        </React.Suspense>
      </TabPanel>

    </TabContext>
  </Box>
  )
}

export default UserSettings