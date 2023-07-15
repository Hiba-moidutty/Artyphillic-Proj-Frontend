import React,{ useState,useEffect } from 'react';
import '../Events/Events.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { EditArtist_OrderStatus, Get_Orders } from '../../../utils/Constants';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NoDataFound from '../NoDataAvailable/NoDataAvailable';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function ArtistOrders() {
  const{ artistId } = useParams()
  const [orderedposts,setOrderedPosts] = useState([]);
 
  const currentid = Cookies.get('id')

  const getOrderedPosts = async () => {
    try {
      const response = await axios.get(`${Get_Orders}${artistId}`)
      console.log(response.data.data,'responssse');
      setOrderedPosts(response.data.data);
    } catch (err) {
      console.log(err)
      console.log("error in getting the artist ordered post ")
      return[];
    }
  };

  useEffect (() => {
    getOrderedPosts(artistId);
  }, [artistId])

  const updateOrderStatus = (orderId, newStatus) => {
    // Updating the order status in the orderedposts state
    const updatedPosts = orderedposts.map((post) => {
      if (post.id.toString() === orderId.toString()) {
        return { ...post, order_status: newStatus };
      }
      return post;
    });

    setOrderedPosts(updatedPosts);
    axios.patch(`${EditArtist_OrderStatus}${orderId}`, { order_status: newStatus })
    .then((response) => {
      toast.success('Status updated successfully')
      console.log(response.data);
    })
    .catch((error) => {
      toast.error('Status updation unsuccessfull')
      console.log(error);
    });
  }

  const handleChangeStatus = (event,orderId)=>{
    const newStatus=event.target.value;
    updateOrderStatus(orderId,newStatus)
  }


  return (
    <div>
      {orderedposts.length === 0 ?(
         <>
         <div className="post">
         <NoDataFound data={"Orders"}/>
         </div>
         {/* <SkeltonLoad /> */}
         </>
      ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '' }}>
      {orderedposts.map((orderedpost,index)=>{

        const cardWidth = `${100 / 3}%`;
        const cardHeight = '100%';
        
        return(
      <Box key={index} sx={{ minWidth:325 , width: cardWidth, height: cardHeight ,my:4 }}>
        <Card variant="outlined" sx={{my:5 , mx:2}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <div className='artist-info'>
              <img src={decodeURIComponent(orderedpost.artist_profileimg).replace('/https:', 'https:/')} alt="" />
                  <Link 
                        to={`/profile/${orderedpost.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{orderedpost.artist_sellername}</span>
                        </Link>
                  </div>
            </Typography>
            <Typography component="div">
            </Typography>
              <br />
              <img style={{width:100,height:100}} src={decodeURIComponent(orderedpost.post_image).replace('/https:', 'https:/')} alt="" />
              
            <Typography sx={{ mb: 1 }} color="text.secondary">
              <br />
            <span style={{ fontWeight: 'bold'}}>Base price : </span>{orderedpost.post_baseprice}
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold'}}>Buyer : </span>{orderedpost.artist_buyername}
              <br />
              <span style={{ fontWeight: 'bold'}}>Total price paid : </span>{orderedpost.total_price}
              <br />
              <span style={{ fontWeight: 'bold'}}>Payment method: </span>{orderedpost.payment_method} 
              <br />
              <span style={{ fontWeight: 'bold'}}>Ordered At : </span>{orderedpost.order_date} 
              {/* <span style={{ fontWeight: 'bold'}}>Order Status: </span>{orderedpost.order_status}  */}
            </Typography>
          <FormControl variant="standard" sx={{ m:1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Order Status</InputLabel>
          <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={orderedpost.order_status}
          onChange={(event)=>handleChangeStatus(event,orderedpost.id)}
          >
          <MenuItem value="">
            <em>{orderedpost.order_status}</em>
          </MenuItem>
          <MenuItem value='Shipping'>Shipping</MenuItem>
          <MenuItem value='Delivered'>Delivered</MenuItem>
        </Select>
        </FormControl>
          </CardContent>
          {/* <CardActions>
          </CardActions> */}
        </Card>
      </Box>
    )
      }
      )}
      </div>
      )}
    </div>
  );
}

export default ArtistOrders
