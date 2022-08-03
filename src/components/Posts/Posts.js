import React, { useEffect, useState  } from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import {Grid,CircularProgress} from '@material-ui/core'
import { useStateValue } from "../../StateProvider";
import Pusher from 'pusher-js'
import axios from '../../axios'

const pusher = new Pusher('9c25d2586a2494546f2a', {
  cluster: 'ap2'
});
const Posts=({setCurrentId,currentId})=> {
  const[postData,setPostData]=useState([])
  const syncFeed=()=>{
    axios.get('/retrieve/posts').then((res)=>{
      console.log(res.data);
      setPostData(res.data);
    })
  }

  useEffect(()=>{
    syncFeed()
  },[])
useEffect(()=>{
    const channel = pusher.subscribe('postmessages');
    channel.bind('inserted', function(data) {
      syncFeed();
    });
    channel.bind('updated', function(data) {
      syncFeed();
    });
    channel.bind('deleted', function(data) {
      syncFeed();
    });
  },[])
    const classes=useStyles();
  return (
    !setPostData.length ? <CircularProgress />:(
      <Grid className={classes.container} container justify='space-between' alignItems='stretch' spacing={3} >
{
  postData.map(entry=>(
    <Grid item key={entry._id} xs={12} sm={6}>
    <Post post={entry} setCurrentId={setCurrentId} currentId={currentId}/>
    </Grid>
  ))
}
      </Grid>
    )

  )
}

export default Posts