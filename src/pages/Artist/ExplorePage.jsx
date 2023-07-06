import {React, useEffect} from 'react'
import Explore from '../../Components/Artist/Explore/Explore'
import LeftBar from '../../Components/Artist/LeftBar/LeftBar'
// import RightBar from '../../../components/user/rightBar/RightBar';
// import { useSelector } from 'react-redux';
// import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
import NavBarArtist from '../../Components/Artist/NavBarArtist/NavBarArtist';
import { setArtistLogin } from '../../Redux/Artist/artistnameSlice';
import axios from '../../utils/axios';
import {Artist_Details} from '../../utils/Constants';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// const LazyExplore = React.lazy(()=>import('../../../components/user/explore/ExplorePosts'))

function ExplorePage() {

  const dispatch = useDispatch()
  const artistId = Cookies.get('id')

  useEffect(()=>{
    const fetchUserDetails = async (artistId) => {
      console.log('inside keriiiiii');
      try{
        const response = await axios.get(`${Artist_Details}?id=${artistId}`)
        console.log(response,'response is here.....');
        dispatch(setArtistLogin({email:response.data.email,
          username:response.data.username})
          );
        }
      catch (err) {
        console.log('fetchArtistDetails error', err);
      }
    };

    fetchUserDetails(artistId);
  },[dispatch])

  // const userId=useSelector((state)=>state?.artistname?.username)

  return (
    <div>
     <NavBarArtist/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
        <Explore />
      </div>
        </div>
        {/* <RightBar userId={userId}/> */}
      </div>
    </div>
  )
}

export default ExplorePage
