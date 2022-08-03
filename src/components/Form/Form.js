import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Pusher from 'pusher-js'
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useStateValue } from "../../StateProvider";
import axios from '../../axios'
const pusher = new Pusher('9c25d2586a2494546f2a', {
  cluster: 'ap2'
});

const Form=({currentId,setCurrentId})=> {

  const[data,setdata]=useState([])
  const syncFeed= async()=>{
    await axios.get('/retrieve/posts').then((res)=>{
      console.log(res.data);
      setdata(res.data);
    })
  }
  const user=JSON.parse(localStorage.getItem('profile'))
useEffect(()=>{
    syncFeed()
  },[])

const post = data.find((p)=>p._id === currentId ) ;

useEffect(() => {

if(post){
setPostData(post);
console.log(post)
}
},[post]);
    const classes=useStyles();
   
    const[postData,setPostData]=useState({
     title:'',message:'',tags:'',selectedFile:''
    })

    useEffect(()=>{
      const channel = pusher.subscribe('postmessages');
      channel.bind('inserted', function(data) {
        syncFeed();
        clear();
      });
     channel.bind('updated', function(data) {
      syncFeed();
    });
    channel.bind('deleted', function(data) {
      syncFeed();
    });
     
    },[])
    const handlesubmit=(e)=>{
e.preventDefault();
if (currentId) {
  updatePost(postData,currentId)
 
  //dispatch(updatePost(currentId, postData));
  clear();
  setPostData({
   title:'',message:'',tags:'',selectedFile:''
  });
} else {
  savePost(postData)
  // dispatch(createPost(postData));
 
  clear();
  setPostData({
    title:'',message:'',tags:'',selectedFile:''
  });
}



    }
const savePost = async (postData) => {
      await axios.post('/upload/post',{...postData,name:user?.result?.name}).then((res)=>{
        console.log(res)
      })

      
    }
    const clear=()=>{
      setCurrentId(null);
      setPostData({
        title:'',message:'',tags:'',selectedFile:' '
      });
    }
   
    const updatePost = async (postData,currentId) => {
      axios.patch(`/${currentId}/updatePost`,{...postData,name:user?.result?.name}).then((res)=>{
        console.log(res)
      })
    }
    if (!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      );
    }
  return (

    <Paper className={classes.paper}>
<form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlesubmit}>
<Typography variant='h6'>{currentId ? 'Editing' : 'Creating'}</Typography>

<TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData,title:e.target.value})} />
<TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData,message:e.target.value})} />
<TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData,tags:e.target.value.split(',')})} />
<div className={classes.fileInput}>
<FileBase type="file" multiple={false} value={postData.selectedFile} onDone={(Converted) => setPostData({...postData,selectedFile:Converted.base64})} />
</div>
<Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth onClick={handlesubmit}>Submit</Button>
<Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
</form>

    </Paper>
  )
}

export default Form