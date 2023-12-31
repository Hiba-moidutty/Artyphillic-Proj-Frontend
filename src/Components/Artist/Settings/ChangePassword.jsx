import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormLabel from '@mui/joy/FormLabel';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import toast,{Toaster} from 'react-hot-toast'
import decodeToken from '../../../utils/Services'
import { changeUserPassword } from '../../../api/UserServices';


function ChangePassword() {


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showNewPassword,setShowNewPassword]=useState(false);
    const handleShowNewPassword = ()=> setShowNewPassword((shownew)=>!shownew)
    const [showReNewPassword,setReNewPassword]=useState(false);
    const handleShowReNewPassword = ()=> setReNewPassword((showRenew)=>!showRenew)


    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassoword,setConfirmPassword]=useState("");


    const [showButton,setShow]=useState(true)

    // const [passMatchError,setPassMatchError]=useState(false);
    const [minNewPassError,setMinNewPassError]=useState(false)
    const [minRePassError,setRePassError]=useState(false)

    const comparePassword = (data)=>{
        if(data?.trim()==="" || data?.trim().length < 5){
            setRePassError(true)
            setShow(true)
        }else{
            setRePassError(false)
            setShow(false)
        }
     
        setConfirmPassword(data)
    }
    const newPasswordset = (data)=>{
        if(data?.trim()==="" || data?.trim().length < 5){
            setMinNewPassError(true)
            setShow(true)
        }else{
            setMinNewPassError(false)
        }
        setNewPassword(data)
    }

    const handleSavePassword = async ()=>{
        try{
            const userId=decodeToken();
            const body={
                userId,
                currentPassword,
                newPassword,
                confirmPassoword
            }

            const response = await changeUserPassword(body)
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            toast.success(response.data.message)
        }catch(err){
            toast.error(err.response.data.message)
        }
        

    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> 
            <Stack spacing={2}>
                <FormControl  variant="outlined">
                    <FormLabel>Type your current password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={currentPassword}
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                        required
                        size='small'
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <FormLabel>Type your new password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-newpassword"
                        type={showNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowNewPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={newPassword}
                        onChange={(e)=>newPasswordset(e.target.value)}
                        required
                        size='small'
                    />
                    {minNewPassError && <span style={{color:"red"}}>Minimum five character Required</span>}
                </FormControl>
                <FormControl  variant="outlined">
                    <FormLabel>Retype your new password</FormLabel>
                    <OutlinedInput
                        id="outlined-adornment-retypenewpassword"
                        type={showReNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowReNewPassword}
                                    edge="end"
                                >
                                    {showReNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={confirmPassoword}
                        onChange={(e)=>comparePassword(e.target.value)}
                        required
                        size='small'
                    />
                    {minRePassError && <span style={{color:"red"}}>Min five character Required</span>}
                    {/* {passMatchError && <span style={{color:"red"}}>Password not Matched</span>} */}
                </FormControl>
               
                <Button sx={{width:'23ch'}} onClick={handleSavePassword} disabled={showButton} variant="contained">Save</Button>
            </Stack>
            <Toaster/>
        </Box>
    )
}

export default ChangePassword 