import React, { startTransition, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography'; 
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Grid } from '@mui/material';
import axios from '../../../utils/axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Event} from '../../../utils/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import { DialogContent, TextField } from '@mui/material';


function AddEvent() {
  const [open,setOpen] = useState(false);
  const [loading,setLoading]=useState(false);
  const [isEventAdded, setIsEventAdded] = useState(false);
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [eventdate,setEventdate] = useState(null);
  const [place,setPlace] = useState('');
  const [eventstart,setEventstart] = useState('');
  const [eventend,setEventend] = useState('');
  const [slots,setSlots] = useState();
  const [bookPrice,setBookingPrice] = useState();
  // const artist_id = useSelector((state) => state.artistname?.email); 
  // const dispatch = useDispatch();
  // const profilePic = useSelector((state) => state.artistname?.profile);
  const artist_id = Cookies.get('id');

  // useEffect(() => {
  //   if (isEventAdded) {
  //     // Refresh the page only when the event has been added
  //     window.location.reload();
  //   }
  // }, [isEventAdded]);

    // Fetch the updated events list
    // const fetchUpdatedEvents = async () => {
      // Make the API call to fetch the updated events list
      // Update the events list in your state or Redux store
      // Example code:
      // const response = await axios.get('/api/events');
      // const updatedEvents = response.data;
      // updateEventsList(updatedEvents);
    // };


  const handleAddEvent = async (event) =>{
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('event_name',name);
    formData.append('event_date', moment(eventdate).format('YYYY-MM-DD'));
    formData.append('event_place',place);
    formData.append('event_start_time',moment(eventstart, 'HH:mm:ss').format('HH:mm:ss'));
    formData.append('event_end_time',moment(eventend, 'HH:mm:ss').format('HH:mm:ss'));
    formData.append('total_slots',slots);
    formData.append('booking_price',bookPrice);
    formData.append('conducting_artist',artist_id);
    const token = Cookies.get('jwt_artist');
  

    if (name === '' || place === ''){
      console.log('empty string');
      return toast.error('Cant add an event without name or place!!');
    } 
    else {
      try{
        const response = await axios.post(Add_Event,formData,{
          headers:{Authorization : `Bearer ${token}`},
        });
        if (response.status === 201){
          setLoading(false);
          toast.success('Event added successfully');
          setName('');
          setEventdate(null);
          setPlace('');
          setEventstart('');
          setEventend('');
          setSlots();
          setOpen(false)
           // Fetch the updated events list here
           fetchUpdatedEvents();
          // navigate('/eventslist');
        }
        else if (response.status === 400){
          toast.error('Error 400');
          navigate('/artistfeed');
          setOpen(false)
        }
        else{
          toast.error('Failed to add event');
          setOpen(false)
          setLoading(false);
        }
      } catch (error){
      }
    }
  };

  const handleEventDate = (date) => {
    console.log(date,'ddddddd');
    setEventdate(date);
  };

  // const isEventDateValid = moment(eventdate).isSameOrAfter(moment(), 'day');

  const handleEventstartChange = (event) =>{
    setEventstart(event.target.value);
  };

  const handleEventendChange = (event) => {
    setEventend(event.target.value);
  };

  const handleSlotsChange = (event) => {
    setSlots(event.target.value);
  };

  const handleBookPriceChange = (event) => {
    setBookingPrice(event.target.value);
  };

    return ( 
      <React.Fragment>
        <Button
          variant="contained"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          style={{ color:"#611D42" , backgroundColor: "#F0D9E7", width: "165px"}}
        >
          New Event
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 , width: '90%' }}
          >
            <Typography style={{ color:"#611D42" }} id="basic-modal-dialog-title" component="h2">
              Add New Event
            </Typography>
            {/* <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the information of the project.
            </Typography> */}
            {/* Your form or component */}
            <form onSubmit={handleAddEvent}>
              <Stack spacing={1}>
                <FormControl>
                  <FormLabel>Event Name</FormLabel>
                  <TextField placeholder="Type anything…" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl>
                <FormLabel>Event Date</FormLabel>
                <DatePicker
                  selected={eventdate}
                  onChange={handleEventDate}
                  minDate={new Date()}
                  placeholderText="Select a date"
                />
                </FormControl>

                <FormControl>
                  <FormLabel>Event Place</FormLabel>
                  <TextField placeholder="Type anything…" value={place} onChange={(e) => setPlace(e.target.value)} />
                </FormControl>
                <Grid container>
                  <Grid item xs={4} style={{ display: 'flex' }}>
                  <FormControl>
                    <FormLabel>Event Starting Time</FormLabel>
                    <TextField
                      placeholder="Starting Time"
                      value={eventstart}
                      onChange={handleEventstartChange}
                    />
                  </FormControl>
                  </Grid >
                  <Grid item xs={4} style={{ display: 'flex', marginLeft:'1rem' }} >
                    <FormControl >
                      <FormLabel>Event Ending Time</FormLabel>
                      <TextField
                      placeholder="Ending Time"
                      value={eventend}
                      onChange={handleEventendChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}  style={{ display: 'flex' , marginLeft:'1rem'}}>
                <FormControl>
                <FormLabel>Total Slots</FormLabel>
                  <TextField  placeholder="Total Slots" value={slots} onChange={handleSlotsChange} />
                </FormControl>
                </Grid>
                </Grid>
                <FormControl>
                <FormLabel>Booking Price</FormLabel>
                  <TextField  placeholder="Booking Price for this Event" value={bookPrice} onChange={handleBookPriceChange} />
                </FormControl>
                <Button type="submit" loading={loading}  disabled = {!name || !place || slots < 10 || !bookPrice }>Submit</Button>
              </Stack>
              </form>
          </ModalDialog>
        </Modal>
        <Toaster/>
      </React.Fragment>
    );
}


export default AddEvent