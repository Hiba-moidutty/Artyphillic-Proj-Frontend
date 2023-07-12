import React,{ useState,useEffect } from 'react';
import './Events.css';
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
import UserBookingEvent from '../../User/Modals/UserBookingEvent';

const bull = (
  <Box
  component="span"
  sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Events() {
  const [open,setOpen] = useState(false)
  const [events,setEvents] = useState([]);
  const artistId = Cookies.get('id');
  let userId;

  const currentrole = Cookies.get('role')
  if (currentrole == 'user'){ 
    userId = Cookies.get('id')
  }

  let profilePic = useSelector((state) => state.artistname?.artistDetails?.profile_img);
  const handleCloseModal = () => {
    setOpenModal(false);
  }

  useEffect (() => {
    async function fetchEvents(){
      const response = await axios.get(Eventslist);
      setEvents(response.data);
      console.log(response.data,'response of events');
    }
    fetchEvents();
  },[])


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
                  {userId ? (<Link 
                        to={`/artistprofile/${event.artist_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        >
                        <span>{event.artist_name}</span>
                        </Link>):(
                          <Link 
                          to={`/profile/${event.artist_id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                          >
                          <span>{event.artist_name}</span>
                          </Link>
                        )}
                       { event.artist_id == artistId ? ( <div style={{ marginLeft: 'auto'}}>
                          <EventMenuButton eventId={event.id} eventArtistId={event.artist_id} artistId={artistId} eventName={event.event_name} eventDate={event.event_date}
                          eventStart={event.event_start_time} eventEnd={event.event_end_time} totalSlots={event.total_slots} bookingPrice={event.booking_price}/>
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

         {event.artist_id == artistId ? <span style={{fontWeight:'bold',fontSize: 16,color:'#611D42'}}>You cannot book your own event!! </span>
        : 
         ( event.total_slots>=0 ? ( currentrole == 'user'? ( <UserBookingEvent eventId={event.id} eventname={event.event_name} artist_Id={event.artist_id} artistname={event.artist_name} 
         peramount={event.booking_price} t_slots={event.total_slots} userId={userId}/>):(
          <BookEventModal eventId={event.id} eventname={event.event_name} artist_Id={event.artist_id} artistname={event.artist_name} 
         peramount={event.booking_price} t_slots={event.total_slots} />
         ))
         :
         (
         <span style={{ fontWeight: 'bold',fontSize: 16,color:'#611D42'}}>Out of slots</span>
         ))}
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

export default Events;
