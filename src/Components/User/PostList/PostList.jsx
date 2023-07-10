import { useState } from "react";
import "../../Artist/Post/Post.css";
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
import { Posts, User_Details } from '../../../utils/Constants'
import axios from '../../../utils/axios'
import { useEffect } from "react";
import { setUserDetails } from "../../../Redux/User/usernameSlice";
import BuyPost from "../../Artist/Modal/BuyPost";


function PostList(){
  
  const[orderDetails,setOrderDetails] = useState([]);
  const userId = Cookies.get('id');
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try{
          console.log(userId,'ooooooooooooo');
          var token = Cookies.get('jwt_artist');
          const response = await axios.get(`${User_Details}${userId}`,{ headers: { 
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json", 
            }
          })
          const userDetails = response.data.data;
          console.log(userDetails, 'dddddd');
          dispatch(setUserDetails(userDetails));               
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
  let profilePic = useSelector((state) => state.user?.userDetails?.profile_img);
  console.log(profilePic,'gooooooot it');

  useEffect (() => {
    getUserDetails(userId);
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
      if (post.artist_id == userId) {
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
                      <Link
                        to={`/profile/${post.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span className="name">{post.artist_name}</span>
                        </Link>
                </div>
                  <span className="date">{moment(post.created_at).fromNow}</span>
              </div>
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
                {userId == post.artist_id ? null :
                (
                  isOrderPlaced?(
                    <span style={{ color: 'red', fontWeight: 'bold'}} >This post has been SoldOut</span>
                  ):(
                    <BuyPost seller_id={post.artist_id} bprice={post.base_price} sprice={post.shipping_price} postId={post.id} postimage={post.image}/>
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

export default PostList;