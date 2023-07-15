import React, { useEffect, useState } from 'react'
import './Events.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { User_BookedEvents } from '../../../utils/Constants';
import { useParams } from 'react-router-dom';
import NoDataFound from '../NoDataAvailable/NoDataAvailable';


function UserBookedEvents() {
  const{ artistId } = useParams()
  console.log(artistId,'id passing artist');
  const [userbookedevents,setUserBookedEvents] = useState([]);
  
  const artist_Id = Cookies.get('id')
  console.log(artistId,'currenttttt artist');

  const getUserBookedEvents = async () => {
    try {
      const response = await axios.get(`${User_BookedEvents}${artistId}`)
      console.log(response.data,'user booked events responsssssseee');
      setUserBookedEvents(response.data);
    } catch (err) {
      console.log(err)
      console.log("error is getting user posts profile")
      setUserBookedEvents([]);
    }
  };

  useEffect (() => {
    getUserBookedEvents(artistId);
  }, [artistId])


  return (
    <div>
      {userbookedevents.length === 0 ? (
         <>
         <div className="post">
         <NoDataFound data={"Booked Events"}/>
         </div>
         {/* <SkeltonLoad /> */}
         </>

      ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '' }}>
      {userbookedevents.map((event,index)=>{
        // var imagefile
        // if (event.artist_id === artist_Id) {
        //   imagefile = true
        // }
        const cardWidth = `${100 / 3}%`;
        const cardHeight = '300px';
        
        return(
      <Box key={index} sx={{ minWidth:325 , width: cardWidth, height: cardHeight ,my:4 }}>
        <Card variant="outlined" sx={{my:5 , mx:2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <div className='artist-info'>
           <img src={decodeURIComponent(event.user_profileimg).replace('/https:', 'https:/')} alt="" />
                  <Link 
                        to={`/profile/${event.username}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{event.user_name}</span>
                        </Link>
                  </div>
            </Typography>
            <br />
            <Typography variant="h5" component="div">
             {event.bookedevent}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              On {event.bookedeventdate}, held at {event.bookedeventplace}
            </Typography>
            <Typography variant="body2">
              <span>No.of Slots Booked : </span>{event.slot_no} 
            </Typography>
          </CardContent>
          {/* <CardActions>

         {event.artist_id == artistId ? null : ( <BookEventModal eventId={event.id} eventname={event.event_name} artist_Id={event.artist_id} artistname={event.artist_name} peramount={event.booking_price} t_slots={event.total_slots} />)}

          </CardActions> */}
        </Card>
      </Box>
    )
      }
      )}
      </div>
            )}
    </div>
  )}

export default UserBookedEvents