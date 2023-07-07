import React,{ useState,useEffect } from 'react';
import '../Events/Events.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { View_MyOrders } from '../../../utils/Constants';
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

function ViewMyOrders() {
  const{ artistId } = useParams()
  const [orderedposts,setOrderedPosts] = useState([]);
 
  const currentid = Cookies.get('id')

  const getOrderedPosts = async () => {
    try {
      const response = await axios.get(`${View_MyOrders}${artistId}`)
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


  return (
    <div>
      {orderedposts.length == 0 ?(
         <>
         <div className="post">
         <NoDataFound data={"Orders"}/>
         </div>
         {/* <SkeltonLoad /> */}
         </>

      ) : (
    <div>
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
              <img src={decodeURIComponent(orderedpost.artist_profileimg).replace('/https:', 'https:')}  alt=""/>
                  <Link 
                        to={`/profile/${orderedpost.artist_seller}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{orderedpost.artist_sellername}</span>
                        </Link>
                  </div>
            </Typography>
              <br/>
            <Typography component="div">
            </Typography>
              <img style={{width:100,height:100}} src={decodeURIComponent(orderedpost.post_image).replace('/https:', 'https:')} alt="" />
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
              <br />
              <span style={{ fontWeight: 'bold'}}>Order Status: </span>{orderedpost.order_status} 
            </Typography>
          </CardContent>
          {/* <CardActions>
          </CardActions> */}
        </Card>
      </Box>
    )
      }
      )}
      </div>
    </div>
    )}
      
    </div>
  );
}

export default ViewMyOrders
