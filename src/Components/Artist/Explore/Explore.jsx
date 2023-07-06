import React, { useEffect, useState } from 'react'
import './Explore.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { setExplorePosts } from '../../../Redux/Artist/artistnameSlice';
import { Posts } from '../../../utils/Constants';
import axios from '../../../utils/axios';
// import { fetchExplorePosts } from '../../../api/UserServices';


function Explore() {

  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const artistId=useSelector((state)=>state.artistname?.username)
  const allPosts = useSelector((state) => state.artistname?.explorePosts);
 
  const exploreAllPosts = async () => {
    try {
      const response = await axios.get(`${Posts}?page=${page}&artistId=${artistId}`);
      dispatch(setExplorePosts(response.data));
      setLoading(false)
    } catch (err) {
      console.log("explore post error", err) 
    }
  }

  useEffect(() => {
    exploreAllPosts(); 
  }, [page,artistId])

  const handleScroll = ()=>{
    const { scrollTop, clientHeight, scrollHeight } =
    document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
          setLoading(true)
          setPage((prev) => prev + 1);
      }
        }

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll)

    return ()=>window.removeEventListener("scroll",handleScroll)

  },[])
 

  return (
    <div className='explore'>
      {allPosts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {loading && <div>Loading more posts...</div>}
    </div>
  )
}

export default Explore