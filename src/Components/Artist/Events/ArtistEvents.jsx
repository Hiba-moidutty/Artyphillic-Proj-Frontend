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
import { ArtistEvents_list } from '../../../utils/Constants';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import EventMenuButton from './EventMenuButton';
import NoDataFound from '../NoDataAvailable/NoDataAvailable';

function ArtistEvents() {
  const{ artistId } = useParams()
  console.log(artistId,'id passing  artist');
  const [events,setEvents] = useState([]);
  
  const artist_Id = Cookies.get('id')
  console.log(artistId,'currentttttttttt artist');

  const getArtistEvents = async () => {
    try {
      const response = await axios.get(`${ArtistEvents_list}${artistId}`)
      console.log(response.data.data,'responssse');
      setEvents(response.data.data);
    } catch (err) {
      console.log(err)
      console.log("error is getting user posts profile")
      return[];
    }
  };

  useEffect (() => {
    getArtistEvents(artistId);
  }, [artistId])


  return (
    <div>
      {events.length == 0 ?(
         <>
         <div className="post">
         <NoDataFound data={"Posts"}/>
         </div>
         {/* <SkeltonLoad /> */}
         </>

      ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '' }}>
      {events.map((event,index)=>{
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
           <img src={decodeURIComponent(event.artist_profileimg).replace('/https:', 'https:')} alt="" />
                  <Link 
                        to={`/profile/${event.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{event.artist_name}</span>
                        </Link>
                       { event.artist_id == artist_Id ? ( <div style={{ marginLeft: 'auto'}}>
                          <EventMenuButton eventId={event.id} eventArtistId={event.artist_id} artistId={artistId} eventName={event.event_name} eventDate={event.event_date}
                          eventStart={event.event_start_time} eventEnd={event.event_end_time} totalSlots={event.total_slots} bookingPrice={event.booking_price}  
                         />

                        </div>) : null }
                  </div>
            </Typography>
            <br />
            <Typography variant="h5" component="div">
             {event.event_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              On {event.event_date}, held at {event.event_place}
            </Typography>
            <Typography variant="body2">
              <span>Event Starting Time : </span>{event.event_start_time}am
              <br />
              <span>Event Ending Time : </span>{event.event_end_time}pm
              <br />
              <span>Total Slots Available : </span>{event.total_slots} 
              <br />
              <span>Booking Price : </span>{event.booking_price} 
            </Typography>
          </CardContent>
          <CardActions>

         {event.artist_id == artistId ? null : ( <BookEventModal eventId={event.id} eventname={event.event_name} artist_Id={event.artist_id} artistname={event.artist_name} peramount={event.booking_price} t_slots={event.total_slots} />)}

          </CardActions>
        </Card>
      </Box>
    )
      }
      )}
      </div>
            )}
    </div>
  )}

export default ArtistEvents