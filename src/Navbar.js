import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { useNavigate,useLocation} from 'react-router-dom';
import {Container ,AppBar ,Typography,Grow,Grid,Toolbar,Button,Avatar} from '@material-ui/core';
import memories from './images/memories.png'
import {Link} from 'react-router-dom'
import decode from 'jwt-decode'
function Navbar() {
    const classes=useStyles();
    const history=useNavigate();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const location =useLocation();
    useEffect(() => {
      const token = user?.token;
      if(token){ 
        const decodedToken =decode(token)
if(decodedToken.exp * 1000 < new Date().getTime()){
  logout();
}
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
      
    }, [location]);
const logout=()=>{
  localStorage.clear();
  history('/auth')
  setUser(null)
  
}
  return (
    <div  style={{"display":"flex","flexDirection":"row"}}>
    <AppBar position='static' color='inherit' className={classes.appBar} >
     <div className={classes.brandContainer}>
<Typography component={Link} to="/"  variant='h2' align='center' className={classes.heading}>Memories</Typography>
<img src={memories} alt='memories' height='60' className={classes.image} />
</div>
 <Toolbar className={classes.toolbar}>
 {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
 </Toolbar>
</AppBar>
</div>
  )
}

export default Navbar