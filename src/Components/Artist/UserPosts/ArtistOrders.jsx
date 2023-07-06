import React,{ useState,useEffect } from 'react';
import '../Events/Events.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { Eventslist } from '../../../utils/Constants';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookEventModal from '../Modal/BookEventModal';
import EventMenuButton from './EventMenuButton';

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
    <React.Fragment>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '' }}>
      {events.map((event,index)=>{
        var imagefile
        if (event.artist_id === artistId) {
          imagefile = true
        }
        const cardWidth = `${100 / 3}%`;
        const cardHeight = '300px';
        
        return(
      <Box key={index} sx={{ minWidth:325 , width: cardWidth, height: cardHeight ,my:4 }}>
        <Card variant="outlined" sx={{my:5 , mx:2}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <div className='artist-info'>
             { imagefile ? <img src={decodeURIComponent(profilePic).replace('/https:', 'https:')} alt=""/> : <img src={decodeURIComponent(event.artist_profileimg).replace('/https:', 'https:')} alt="" />}
                  <Link 
                        to={`/profile/${event.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{event.artist_name}</span>
                        </Link>
                       { event.artist_id == artistId ? ( <div style={{ marginLeft: 'auto'}}>
                          <EventMenuButton eventId={event.id} eventArtistId={event.artist_id} artistId={artistId} eventName={event.event_name} eventDate={event.event_date}
                          eventStart={event.event_start_time} eventEnd={event.event_end_time} totalSlots={event.total_slots} bookingPrice={event.booking_price} eventName={event.event_name}/>

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
    </React.Fragment>
  );
}

export default ArtistOrders;
