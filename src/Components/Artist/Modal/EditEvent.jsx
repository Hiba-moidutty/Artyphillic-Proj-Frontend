import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';
// import { setPost } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from '../../../utils/axios';
import { Edit_Event } from '../../../utils/Constants';

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


function EditEventModal({ eventId, eventArtistId, eventName, eventDate, eventStart, eventEnd, totalSlots, bookingPrice}) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editeventName, setEventName] = useState(eventName);
  const [editeventDate, setEventDate] = useState(eventDate);
  const [editeventStart, setEventStart] = useState(eventStart);
  const [editeventEnd, setEventEnd] = useState(eventEnd);
  const [edittotalSlots, setedittotalSlots] = useState(totalSlots);
  const [editbookingPrice, setBookingPrice] = useState(bookingPrice);

  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);


  const getEventDetailsOnOpen = () => {
    setOpen(true);
  }

  const handleEventSubmit = async () => {

    // if (!editcontent || editcontent.trim() === "") {
    //   return toast.error("please Fill the Component")
    // }
    const token = Cookies.get('jwt_artist');
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("artist_id", eventArtistId);
      formData.append("eventId", eventId)

      if (editeventName !== eventName) {
        formData.append("event_name", editeventName);
      }
      if (editeventDate !== eventDate) {
        formData.append("event_date",  moment(eventDate).format('YYYY-MM-DD'));
      }
      if (editeventStart !== eventStart) {
        formData.append("event_start_time", moment(eventStart, 'HH:mm:ss').format('HH:mm:ss'));
      }
      if (editeventEnd !== eventEnd) {
        formData.append("event_end_time", moment(eventEnd, 'HH:mm:ss').format('HH:mm:ss'));
      }
      if (edittotalSlots !== totalSlots) {
        formData.append("total_slots", edittotalSlots);
      }
      if (editbookingPrice !== bookingPrice) {
        formData.append("booking_price", editbookingPrice);
      }

       await axios.patch(`${Edit_Event}${eventId}`, formData, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
        setOpen(false);
        setLoading(false);
        // dispatch(setPost(response.data.post))
        toast.success("Post updated Successfully")
      }).catch((err) => {
        setOpen(false);
        setLoading(false);
        toast.error("Oops Someting went wrong try again later");
      })
    } catch (err) {
      setOpen(false);
      setLoading(false);
      console.log(err)
      toast.error("Oops Someting went wrong try again later");

    }
  }

  return (
    <>
      <MenuItem onClick={getEventDetailsOnOpen}>Edit</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
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
              value={editeventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>Event Date</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={editeventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Event Start Time</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={editeventStart}
              onChange={(e) => setEventStart(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Event End Time</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={editeventEnd}
              onChange={(e) => setEventEnd(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Total Slots</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={edittotalSlots}
              onChange={(e) => setedittotalSlots(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Booking Price</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={editbookingPrice}
              onChange={(e) => setBookingPrice(e.target.value)}
            />
          </Typography>
          <LoadingButton
            size="small"
            sx={{ marginTop: "60px", alignContent: "left" }}
            onClick={handleEventSubmit}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained">
            <span>Update Event</span>
          </LoadingButton>
          {/* </Stack> */}
        </Box>
      </Modal>
      <Toaster />
    </>
  )
}

export default EditEventModal