import React, { startTransition, useState } from 'react'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography'; 
import axios from '../../../../utils/axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Add_Post } from '../../../../utils/Constants';
import { useLocation, useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
// import { fetchExplorePosts, fetchUserFriendsPosts, fetchUserPosts } from '../../../api/UserServices';


function AddPost() {
  const [open,setOpen] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [content,setContent] = useState('');
  const [file,setFile] = useState(null);
  const [basePrice,setBasePrice] = useState();
  const [shippingPrice,setShippingPrice] = useState();
  // const artist_id = useSelector((state) => state.artistname?.email); 
  // const dispatch = useDispatch();
  // const profilePic = useSelector((state) => state.artistname?.profile);
  const artist_id = Cookies.get('id');
  const artistname = Cookies.get('artistname');

  const handleAddPost = async (event) =>{
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('image',file);
    formData.append('art_content',content);
    formData.append('base_price',basePrice);
    formData.append('shipping_price',shippingPrice);
    formData.append('artist',artist_id);
    formData.append('artist_name',artistname);
    const token = Cookies.get('jwt_artist');

    if (content ===''){
      return toast.error('Cant add an empty post!!');
    } 
    else {
      try{
        const response = await axios.post(Add_Post,formData,{
          headers:{Authorization : `Bearer ${token}`},
        });
        console.log(response,'responsssssssssse');
        if (response.status === 201){
          setLoading(false);
          toast.success('Post added successfully');
          setContent('');
          setFile(null);
          setBasePrice(0);
          setShippingPrice(0);
          setOpen(false)
        }
        else if (response.status === 400){
          toast.error('Error 400');
          setOpen(false)
        }
        else{
          toast.error('Failed to add post');
          setOpen(false)
          setLoading(false);
        }
      } catch (error){
      }
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleBasePriceChange = (event) =>{
    setBasePrice(parseFloat(event.target.value));
  };

  const handleShippingPriceChange = (event) => {
    setShippingPrice(parseFloat(event.target.value));
  };

    return ( 
      <React.Fragment>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New post
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Add new Post
            </Typography>
            <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
              Fill in the information of the project.
            </Typography>
          
              <form onSubmit={handleAddPost}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Content</FormLabel>
                  <Textarea placeholder="Type anything…" value={content} onChange={(e) => setContent(e.target.value)} minRows={3} />
                </FormControl>
                <FormControl>
                  <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
                    Add Image
                 </Typography>
                  <input type="file" style={{color:"blue"}} id="myfile"  onChange={handleFileChange}  accept="image/*,video/*" name="myfile"/>
                </FormControl>
                <FormControl>
                <FormLabel>Base price</FormLabel>
                  <Textarea placeholder="Type base price" value={basePrice}  onChange={handleBasePriceChange} />
                </FormControl>
                <FormControl>
                <FormLabel>Shipping price</FormLabel>
                  <Textarea placeholder="Type shipping price" value={shippingPrice} onChange={handleShippingPriceChange} />
                </FormControl>
                <Button type="submit" loading={loading}  disabled = {!content || !file || !basePrice || !shippingPrice ||basePrice < 0|| shippingPrice < 0 }>Submit</Button>
              </Stack>
              </form>
          </ModalDialog>
        </Modal>
        <Toaster/>
      </React.Fragment>
    );
}


export default AddPost