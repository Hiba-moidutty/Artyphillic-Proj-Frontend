import { useState } from "react";
import "./Post.css";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import toast, { Toaster } from 'react-hot-toast'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import moment from 'moment';
import { Link } from "react-router-dom";
// import Comments from "../comments/Comments";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Artist_Details, Get_Orders, Posts } from '../../../utils/Constants'
import axios from '../../../utils/axios'
import { useEffect } from "react";
import { setArtistDetails } from "../../../Redux/Artist/artistnameSlice";
import PostMenuButton from "./PostMenuButton";
import BuyPost from "../Modal/BuyPost";



function Post(){
  
  const[orderDetails,setOrderDetails] = useState([]);
  const artistId = Cookies.get('id');
  const dispatch = useDispatch();

  const getArtistDetails = async () => {
    try{
          console.log(artistId,'ooooooooooooo');
          var token = Cookies.get('jwt_artist');
          const response = await axios.get(`${Artist_Details}${artistId}`,{ headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", 
            }
          })
          const artistDetails = response.data.data;
          console.log(artistDetails, 'dddddd');
          dispatch(setArtistDetails(artistDetails));               
      }
      catch(err){
          console.log("decode error",err)
      }
  }

  const getOrderDetails = async () => {
    try{
      const response = await axios.get(Get_Orders, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const orderDetails = response.data.data;
      setOrderDetails(orderDetails);
      console.log(orderDetails,'oooooooooooooooooooorderrrrrrrrrr');
    }
    catch (error) {
    }
  }

  const [posts,setPosts] = useState([]);
  // const artistId = useSelector((state) => state.artistname?._id)
  let profilePic = useSelector((state) => state.artist?.artistDetails?.profile_img);
  console.log(profilePic,'gooooooot it');

  useEffect (() => {
    getArtistDetails(artistId);
    async function fetchPosts(){
      const response = await axios.get(Posts);
      setPosts(response.data);
      console.log(response.data,'response dataaaa');
    }
    fetchPosts();
    getOrderDetails();
  },[])


  return (
  <div>
    { posts.map((post) => {

      const isOrderPlaced = orderDetails.some((order)=>order.post === post.id)

      var imagefile
      if (post.artist_id == artistId) {
        imagefile = true
      }

      return(
        <div className="post" key={post.id} >
      {/* { */}
        {/* loading ? <CircularLoading /> : */}
          <div className="container ">
            <div className="user">
              <div className="userInfo">
                { imagefile ? <img src={decodeURIComponent(profilePic).replace('/https:', 'https:')} alt=""/> : <img src={decodeURIComponent(post.artist_profileimg).replace('/https:', 'https:')} alt="" />}
                <div className="details">
                  {/* {
                    userId === post.postedUser._id ? <Link
                    to={`/profile`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <span className="name">{post.postedUser?.userName}</span>
                    </Link>
                    :
                    <Link
                    to={`/user-profile/${post?.postedUser?._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <span className="name">{post.postedUser?.userName}</span>
                    </Link>
                  } */}
                      <Link
                        to={`/profile/${post.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span className="name">{post.artist_name}</span>
                        </Link>
                </div>
                  <span className="date">{moment(post.created_at).fromNow}</span>
              </div>
              <PostMenuButton postId={post.id} postedArtistId={post.artist_id} artistId={artistId} content={post.art_content} postImage={post.image}/>
            </div>
            <div className="content">
              {post?.image && 
              <img src={decodeURIComponent(post?.image).replace('/https:','https:')} alt="" />
              }
              <hr></hr>
              <span className="post-content">{post.art_content}</span>
              <br></br>
              <span className="baseprice">Base Price: {post.base_price}</span>
              <br></br>
              <span className="shippingprice">Shipping Charge: {post.shipping_price}</span>
            </div>
            <div className="info">
              <div className="item" >
                {/* {<Like onClick={handleLike} />} */}
                {/* {likeCount} Likes */}
                {artistId == post.artist_id ? null :
                (
                  isOrderPlaced?(
                    <span style={{ color: 'red', fontWeight: 'bold'}} >This post has been SoldOut</span>
                  ):(
                    <BuyPost  seller_id={post.artist_id} bprice={post.base_price} sprice={post.shipping_price} postId={post.id} postimage={post.image}/>
                  )
                )}
              </div>
            </div>
          </div>
      <Toaster />
      </div>
      )
    }
      )}
  </div>
  );   
};

export default Post;