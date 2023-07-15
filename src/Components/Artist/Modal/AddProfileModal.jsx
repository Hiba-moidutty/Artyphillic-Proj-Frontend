import React, { useState, useRef } from "react"
import "react-image-crop/dist/ReactCrop.css"
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop"
import { canvasPreview } from "../../utils/canvasPreview";
import { useDebounceEffect } from "../../utils/useDebounceEffect";
import { useDispatch } from "react-redux";
import axios from '../../../utils/axios';
import { Artist_Profile_Pic, User_Profile_Pic } from "../../../utils/Constants";
import { setArtistProfileImage } from "../../../Redux/Artist/artistnameSlice";
import { toast } from "react-hot-toast";
import { setUserProfilePic } from "../../../Redux/User/usernameSlice";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

function AddProfileModal({openModal,setOpenModal,artistId,userId}) {
  console.log(artistId,'out artist idddddddd');
  console.log(userId,'out userrrrrrrrrrid');
  const dispatch = useDispatch()
 
  const [imgSrc, setImgSrc] = useState("")
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const hiddenAnchorRef = useRef(null)
  const blobUrlRef = useRef("")
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState(16 / 9)


  const addArtistProfileImage = async (artistId,file) =>{
    try{
      console.log(artistId,'inside function jjjjjjjjjjjjjjjjjj');
        const response = await axios.post(`${Artist_Profile_Pic}${artistId}`,file)
        return response
    }catch(err){
        throw err
    }
  } 


  const addUserProfileImage = async (userId,file) =>{
    try{
        const response = await axios.post(`${User_Profile_Pic}${userId}`,file)
        return response
    }catch(err){
        throw err
    }
  } 


  function onSelectFile(e) {
   
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e){
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }


 async function  setNewProfilePicture (blob){
    if (artistId) {
      try{
      const formData=new FormData();
      formData.append('profile_img',blob);
      const response = await addArtistProfileImage(artistId,formData)
      setOpenModal(false);
      console.log(response.data.profile_picture_url,'rrrrrrrrrr profile pic');
      dispatch(setArtistProfileImage(response?.data.profile_picture_url))
      console.log('profile is saved in redux');
      toast.success('Profile updated successfully');
    }catch(Err){
      console.log(Err)
      toast.error('Error updating profile pic');
    }
  } else if(userId){
    try{
      const formData=new FormData();
      formData.append('profile_img',blob);
      const response = await addUserProfileImage(userId,formData)
      setOpenModal(false);
      console.log(response.data.profile_picture_url,'rrrrrrrrrr profile pic');
      dispatch(setUserProfilePic(response?.data.profile_picture_url))
      console.log('profile is saved in redux');
      toast.success('User profile updated successfully');
    }catch(Err){
      console.log(Err)
      toast.error('Error updating user profile pic');
    }
  }
  }


  function onDownloadCropClick() {
    
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist")
    }

    previewCanvasRef.current.toBlob(blob => {
      if (!blob) {
        throw new Error("Failed to create blob")
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob);

      if (artistId || userId) 
      {setNewProfilePicture(blob)};
    })
    toast.success('Profile pic updated')
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title" 
        aria-describedby="modal-desc"
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border:"none"
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Change User Profile Pic
          </Typography>
            <div className="App">
  <div className="Crop-Controls">
    <input type="file" accept="image/*" onChange={onSelectFile} />
  </div>
  <div className="Crop-Wrapper">
    {!!imgSrc && (
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={c => setCompletedCrop(c)}
        aspect={aspect}
      >
        <img
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, width:'300px', height:'300px' }}
          onLoad={onImageLoad}
        />
      </ReactCrop>
    )}
    {!!completedCrop && (
      <div className="Crop-Preview">
        <canvas
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: completedCrop.width,
            height: completedCrop.height
          }}
        />
        <div style={{display: 'flex',justifyContent:"center"}}>
          <button onClick={onDownloadCropClick}>SELECT</button>
          <a
            ref={hiddenAnchorRef}
            download
            style={{
              position: "absolute",
              top: "-200vh",
              visibility: "hidden"
            }}
          >
         
          </a>
        </div>
      </div>
    )}
  </div>
</div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

export default AddProfileModal