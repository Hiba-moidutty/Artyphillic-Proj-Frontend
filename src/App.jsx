import { Route,Routes, BrowserRouter } from 'react-router-dom';
import AdminLoginPage from './pages/Admin/AdminLoginPage'
import UserLoginPage from './pages/User/UserLoginPage';
import ArtistLoginPage from './pages/Artist/ArtistLoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/User/SignUpPage';
import ArtistSignupPage from './pages/Artist/ArtistSignupPage';
import DashboardPage from './pages/Admin/DashboardPage';
import EventListPage from './pages/Admin/EventListPage';
import UserListPage from './pages/Admin/UserListPage';
import ArtistListPage from './pages/Admin/ArtistListPage';
import OrderListPage from './pages/Admin/OrderListPage';
import AdminProtected from './Router/AdminProtected';
import AdminPublic from './Router/AdminPublic';
import FeedPage from './pages/User/FeedPage';
import ArtistProtected from './Router/ArtistProtected';
import UserProtected from './Router/UserProtected';
import Public from './Router/Public';
import UserProfile from './pages/User/UserProfile';
import ArtistFeedPage from './pages/Artist/ArtistFeedPage';
import PostListPage from './pages/Admin/PostListPage';
import ArtistProfile from './pages/Artist/ArtistProfile';
import SettingsPage from './pages/Artist/Settings/SettingsPage';
import EventsPage from './pages/Artist/EventsPage';

function App() {
 
  return (
   <BrowserRouter>
          <Routes>   
          <Route element={<Public/>}>
            <Route path='/' element={ <HomePage />}/>
            <Route path='/signup' element={ <SignUpPage />}/>
            <Route path='/artistlogin' element={ <ArtistLoginPage />}/>
            <Route path='/artistsignup' element={ <ArtistSignupPage />}/>
            <Route path='/userlogin' element={ <UserLoginPage />}/>
          </Route>

          {/* Admin side */}
          <Route element={<AdminPublic/>}>
          <Route path='/adminlogin' element={ <AdminLoginPage />}/>
          </Route>
          <Route element={<AdminProtected/>}>
            <Route path='/dashboard' element={ <DashboardPage />}/>
            <Route path='/artistlist' element={ <ArtistListPage />}/>
            <Route path='/userlist' element={ <UserListPage />}/>
            <Route path='/postslist' element={ <PostListPage />}/>
            <Route path='/eventlist' element={ <EventListPage />}/>
            <Route path='/orderlist' element={ <OrderListPage />}/>
          </Route>

          {/* User side */}
          <Route element={<UserProtected/>}>
          <Route path='/userfeed' element={ <FeedPage />}/>
          <Route path='/userprofile/:userId' element={ <UserProfile />}/>
          <Route path='/artistprofile/:artistId' element={ <ArtistProfile />}/>
          <Route path='/artisteventslist' element={ <EventsPage />}/>
          <Route path='/usersettings' element={ <SettingsPage/>}/>

          </Route>
          
          {/* Artist side */}
          <Route element={<ArtistProtected/>}>
            <Route path='/artistfeed' element={ <ArtistFeedPage />}/>
            <Route path='/eventslist' element={ <EventsPage />}/>
            <Route path='/profile/:artistId' element={ <ArtistProfile />}/>
            <Route path='/viewuserprofile/:userId' element={ <UserProfile />}/>
            <Route path='/settings' element={ <SettingsPage/>}/>
          </Route>         
          </Routes>
    </BrowserRouter>
  )
}

export default App
