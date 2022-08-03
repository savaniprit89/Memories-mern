import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon';
import { gapi } from "gapi-script"
import axios from './axios'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
function Auth() {
    const state=null;
    const history=useNavigate();
    const[formData,setFormData]=useState()
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
          clientId: '139351628610-peiqde3smckpi98ott5s6s0v6l1f79vi.apps.googleusercontent.com',
          plugin_name: "chat"
      })})
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        var data
        if (isSignup) {
          await axios.post('/signup',formData).then((res)=>{
             data=res.data
          })
        localStorage.setItem('profile',JSON.stringify(data))
          //dispatch(signup(form, history));
          history('/');
        } else {
          await axios.post('/signin',formData).then((res)=>{
            data=res.data
          })
         // dispatch(signin(form, history));
             localStorage.setItem('profile',JSON.stringify(data))
          history('/');
        }
    
      };
      const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    
 
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
const data ={result,token}
console.log(data)
    try {
    
        localStorage.setItem('profile',JSON.stringify( data ))
    history('/');
    } catch (error) {
      console.log(error);
    }
   
  };

  const googleError = (error) => {
    console.log(error)
    console.log('Google Sign In was unsuccessful. Try again later');
  }



  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
        )}
        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="139351628610-peiqde3smckpi98ott5s6s0v6l1f79vi.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
    </Paper>
    </Container>
  )
}

export default Auth