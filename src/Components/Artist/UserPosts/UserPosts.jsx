import React, { useEffect, useState } from 'react'
import '../Post/Post.css'
// import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../../utils/axios';
import PostMenuButton from '../Post/PostMenuButton';
import { ArtistPost_list } from '../../../utils/Constants';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import NoDataFound from '../NoDataAvailable/NoDataAvailable';
import Cookies from 'js-cookie';

function UserPosts() {
  const{ artistId } = useParams()
  const [posts,setPosts] = useState([]);

  const currentid = Cookies.get('id')

  const getArtistPosts = async () => {
    try {
      const response = await axios.get(`${ArtistPost_list}${artistId}`)
      console.log(response.data.data,'responssse');
      setPosts(response.data.data);
    } catch (err) {
      console.log(err)
      console.log("error is getting user posts profile")
      return[];
    }
  };

  useEffect (() => {
    getArtistPosts(artistId);
  }, [artistId])


  return (
    <div>
      {posts.length == 0 ?(
         <>
         <div className="post">
         <NoDataFound data={"Posts"}/>
         </div>
         {/* <SkeltonLoad /> */}
         </>

      ) : (
        posts.map((post) => (
          <div className="post" key={post.id} >
            {/* { */}
              {/* loading ? <CircularLoading /> : */}
                <div className="container">
                  <div className="user">
                    <div className="userInfo">
                      {/* {imagefile ? <img src={profilePic} alt="" /> : <img src={post.postedUser?.profilePic} alt="" />} */}
                      <img src={decodeURIComponent(post.artist_profileimg).replace('/https:', 'https:')} alt="" />
                      <div className="details">
      
                        <span className="name">{post.artist_name}</span>
                        <span className="date">{moment(post.created_at).fromNow}</span>
                      </div>
                    </div>

                    {post.artist_id == currentid ? (<PostMenuButton postId={post._id} postedArtistId={post.artist_id} artistId={artistId} content={post.art_content} postImage={post?.image?.url}/>) : null}
                  </div>
                  <div className="content">
                    {
                      post?.image && 
                    <img src={decodeURIComponent(post?.image).replace('/https:', 'https:')} alt="" />
                    }
                    <hr/>
                    <p className="post-content">{post.art_content}</p>
                    <p className="baseprice">Base Price: {post.base_price}</p>
                    <p className="shippingprice">Shipping Charge:{post.shipping_price}</p>
                  </div>
                  <div className="info">
                    <div className="item" >
                      {/* {<Like onClick={handleLike} />} */}
                      {/* {likeCount} Likes */}
                    </div>
                  </div>
                </div>
            <Toaster />
          </div>
            ))

      )}
      
    </div>
  )
}

export default UserPosts