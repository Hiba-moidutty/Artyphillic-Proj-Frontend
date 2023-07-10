import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/joy/Button';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
// import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import { ArtistBooking_Event } from '../../../utils/Constants';
import Cookies from 'js-cookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


function BookEventModal({eventId, eventname,artist_Id,artistname,peramount,t_slots}){

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingDate, setBookingDate] = useState(moment().format('YYYY-MM-DD')); // Set current date
  const [bookedslot,setBookedslot] = useState(0);

  const artist_id = Cookies.get("id");

  const navigate = useNavigate();
  console.log(peramount,'booooooking price');

  const handleCloseModal = () =>{
    setOpen(false)
  }
  
  const handleBookingdateChange = (event) => {
    setBookingDate(event.target.value)
  }

  const loadScript = (src) => {
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = src
    
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }


  const handlePayment = async () => {

    const amount = bookedslot*peramount ;
    const response = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!response) {
      alert('You are offline.....Failed to load Razorpay SDK')
      return
    }

    const options = {
      key: "rzp_test_GU1D0axPPNH503",
      amount: amount * 100,
      currency: "INR",
      name: "Artyphilic",
      description: "Booking Event Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          // setTrancationId(response.razorpay_payment_id);
          booking_event();
        } else {
          toast.error('Payment Failed');
        }
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
    });
    paymentObject.open();
  };

  const booking_event = () => {
    const t_amount=bookedslot*peramount;

    const data = JSON.stringify({
      artist_name: artist_Id,
      bookingartist: artist_id,
      eventname: eventId,
      booking_date : bookingDate,
      payment_amount : t_amount,
      slot_no : bookedslot,
    });
    axios
      .patch(ArtistBooking_Event, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setOpen(false)
        toast.success("Event Booked Successfully");
        navigate('/eventslist');
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        setOpen(false)
        // setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Button
          variant="outlined"
          color="info"
          // startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
         Book Your Slot Now
        </Button>
              <Modal
             open={open}
             onClose={handleCloseModal}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             disableEnforceFocus={true}
             >
              <Box sx={style} borderRadius={5}>
          {/* <Stack direction="row"  spacing={2}> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>Event Name</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={eventname}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>Booking Date</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={bookingDate}
              onChange={handleBookingdateChange}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Artist Name</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={artistname}
            />
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">No.of Slots</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={bookedslot}
          onChange={(e) => setBookedslot(e.target.value)}
          label="Slots"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Amount to be Paid</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={bookedslot*peramount}
            />
          </Typography>
          <Button
            size="small"
            sx={{ marginTop: "60px", alignContent: "left" }}
            onClick={handlePayment}
            endIcon={<SendIcon />}
            loadingPosition="end"
            variant="contained">
            <span>Pay and Book</span>
          </Button>
          {/* </Stack> */}
        </Box>
             </Modal>
            </React.Fragment>
  )
}

export default BookEventModal