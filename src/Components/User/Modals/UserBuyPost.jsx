import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
// import Button from '@mui/joy/Button';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
// import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import { ArtistOrdering_Post, Get_ArtistAddress, Get_UserAddress, UserOrdering_Post } from '../../../utils/Constants';
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

function UserBuyPost({seller_id, bprice, sprice, postId, postimage}){

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressess, setAddress] = useState([]);
  const [orderaddr, setOrderaddr] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [orderDate, setOrderDate] = useState(moment().format('YYYY-MM-DD')); // Set current date
  const user_id = Cookies.get('id')
  const user_name = Cookies.get('username')
  const navigate = useNavigate();


  const handleCloseModal = () =>{
    setOpen(false)
  }
  
    const getUserAddress= async () => {
      const response = await axios.get(`${Get_UserAddress}${user_id}`);
      setAddress(response.data.data);
      console.log(response.data.data,'response of user Addressss');
    }


useEffect(()=>{
  getUserAddress();
},[])

  const handleOrderdateChange = (event) => {
    setOrderDate(event.target.value)
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

  const handleChangeAddress = (event)=>{
    const selectedAddress = event.target.value
   setSelectedAddress(selectedAddress);
   setOrderaddr(selectedAddress.id);
  }

  const handlePayment = async () => {

    const amount = bprice+sprice ;
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
      description: "Ordering Post Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          // setTrancationId(response.razorpay_payment_id);
          order_post();
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

  const order_post = () => {
    const t_amount=bprice*sprice;

    const data = JSON.stringify({
      art_seller:seller_id,
      user_buyer:user_id,
      post:postId,
      order_date:orderDate,
      total_price:t_amount,
      address:orderaddr,
      payment_method:'razor-pay'
    });

    axios
      .patch(UserOrdering_Post, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setOpen(false)
        toast.success("Post Ordered Successfully");
        navigate('/userfeed');
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
          color="secondary"
          startDecorator={<AddShoppingCartSharpIcon />}
          onClick={() => setOpen(true)}
        >
          Order Now
        </Button>
            <Modal
             open={open}
             onClose={handleCloseModal}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             disableEnforceFocus={true}
             >
          <Box sx={style} borderRadius={5}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>Post Name</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={postId}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span>Ordering Date</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={orderDate}
              onChange={handleOrderdateChange}
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
              value={artist_name}
            />
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select the Address</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedAddress}
          onChange={handleChangeAddress}
          label="Slots"
        >
         {addressess.map((addr) => 
          <MenuItem key={addr.id} value={addr}>{addr.local_address},{addr.alt_ph_number},{addr.pincode}</MenuItem>
         )}
        </Select>
      </FormControl>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span>Total Price</span>
            <TextField
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              rows={1}
              variant="standard"
              value={bprice+sprice}
            />
          </Typography>
          <Button
            size="small"
            sx={{ marginTop: "60px", alignContent: "left" }}
            onClick={handlePayment}
            endIcon={<SendIcon />}
            loadingPosition="end"
            variant="contained"
            disabled={!selectedAddress.id}>
            <span style={{ color: 'primary', fontWeight: 'bold'}} >Pay and Book</span>
          </Button>
        </Box>
             </Modal>
            </React.Fragment>
  )
}

export default UserBuyPost