// import { useState } from "react";
// import "./Post.css";
// import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
// import toast, { Toaster } from 'react-hot-toast'
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import { Link } from "react-router-dom";
// // import Comments from "../comments/Comments";
// import { useDispatch, useSelector } from "react-redux";
// import moment from 'moment';
// import { Artist_Details, Posts } from '../../../utils/Constants'
// import axios from '../../../utils/axios'
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { setArtistDetails } from "../../../Redux/Artist/artistnameSlice";
// import PostMenuButton from "./PostMenuButton";
// import BuyPost from "../Modal/BuyPost";
// // import { getArtistDetails } from "../../../api/ArtistSide";
// // import PostMenuButton from "./PostMenuButton";

// // import { RWebShare } from "react-web-share";
// // import CircularLoading from "../Loading/CircularLoading";
// // import { toggleLikePost, toggleUnLikePost } from "../../../api/UserServices";



// // const Post = () => {
//   // const [commentOpen, setCommentOpen] = useState(false);
//   // const artistId = useSelector((state) => state.artistname?._id)
//   // let profilePic = useSelector(state.artistname?.artistDetails?.profile_img);
//   // console.log(profilePic,'gooooooot it');
//   // const userName=useSelector((state)=>state?.user?.user?.userName)
//   // const [likeCount, SetLikeCount] = useState(post.likes?.length)
//   // const [Like, setLiked] = useState(post.likes?.includes(userId) ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon);
  
// //   var imagefile
// //   if (post.artist?._id === artistId) {
// //     imagefile = true
// //   }
// // }

// function Post(){
  
//   const userId = Cookies.get('id');
//   const dispatch = useDispatch();

//   const getArtistDetails = async () => {
//     try{
//           console.log(userId,'ooooooooooooo');
//           var token = Cookies.get('jwt_artist');
//           const response = await axios.get(`${Artist_Details}${userId}`,{ headers: { 
//             'Authorization': `Bearer ${token}`,
//             "Content-Type": "application/json", 
//             }
//           })
//           const artistDetails = response.data.data;
//           console.log(artistDetails, 'dddddd');
//           dispatch(setArtistDetails(artistDetails));               
//       }
//       catch(err){
//           console.log("decode error",err)
//       }
//   }

//   const [posts,setPosts] = useState([]);
//   // const artistId = useSelector((state) => state.artistname?._id)
//   let profilePic = useSelector((state) => state.?.artistDetails?.profile_img);
//   console.log(profilePic,'gooooooot it');

//   useEffect (() => {
//     getArtistDetails(artistId);
//     async function fetchPosts(){
//       const response = await axios.get(Posts);
//       setPosts(response.data);
//       console.log(response.data,'response dataaaa');
//     }
//     fetchPosts();
//   },[])


//   return (
//   <div>
//     { posts.map((post) => {

//       var imagefile
//       if (post.artist_id === artistId) {
//         imagefile = true
//       }

//       return(
//         <div className="post" key={post.id} >
//       {/* { */}
//         {/* loading ? <CircularLoading /> : */}
//           <div className="container">
//             <div className="user">
//               <div className="userInfo">
//                 { imagefile ? <img src={decodeURIComponent(profilePic).replace('/https:', 'https:')} alt=""/> : <img src={decodeURIComponent(post.artist_profileimg).replace('/https:', 'https:')} alt="" />}
//                 <div className="details">
//                   {/* {
//                     userId === post.postedUser._id ? <Link
//                     to={`/profile`}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                     <span className="name">{post.postedUser?.userName}</span>
//                     </Link>
//                     :
//                     <Link
//                     to={`/user-profile/${post?.postedUser?._id}`}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                     <span className="name">{post.postedUser?.userName}</span>
//                     </Link>
//                   } */}
//                       <Link
//                         to={`/profile/${post.artist_id}`}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                         <span className="name">{post.artist_name}</span>
//                         </Link>
//                 </div>
//                   <span className="date">{moment(post.created_at).fromNow}</span>
//               </div>
//               <PostMenuButton postId={post.id} postedArtistId={post.artist_id} artistId={artistId} content={post.art_content} postImage={post.image}/>
//             </div>
//             <div className="content">
//               {post?.image && 
//               <img src={decodeURIComponent(post?.image).replace('/https:','https:')} alt="" />
//               }
//               <hr></hr>
//               <span className="post-content">{post.art_content}</span>
//               <br></br>
//               <span className="baseprice">Base Price: {post.base_price}</span>
//               <br></br>
//               <span className="shippingprice">Shipping Charge:{post.shipping_price}</span>
//             </div>
//             <div className="info">
//               <div className="item" >
//                 {/* {<Like onClick={handleLike} />} */}
//                 {/* {likeCount} Likes */}
//                 {artistId == post.artist_id ? null :
//                 (<BuyPost bprice={post.base_price} sprice={post.shipping_price} postId={post.id} postimage={post.image}/>
//                 )}
//               </div>
//               {/* <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
//                 {post.comments.length}
//               </div> */}
//               {/* <div className="item">
//                 <RWebShare data={{
//                   text: `User Post`,
//                   url: `http://localhost:3000/user-profile/${post?.postedUser?._id}`,
//                   title: `${post.postedUser?.userName}s Post`,
//                 }}
//                 onClick={() => console.log("shared successfully!")}>
//                 <ShareOutlinedIcon />
//               </RWebShare>
//                 Share
//               </div> */}
//             </div>
//           </div>
//       <Toaster />
//       </div>
//       )
//     }
//       )}
//   </div>
//   );   
// };

// export default Post;