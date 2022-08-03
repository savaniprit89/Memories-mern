import React from 'react'
import useStyles from './styles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import Pusher from 'pusher-js'
import axios from '../../../axios'
const Post=({post,setCurrentId,currentId})=> {
  
    const classes=useStyles();
  
    const user = JSON.parse(localStorage.getItem('profile'));
    const deletepost = async (id)=>{
      axios.delete(`/${id}/deletePost`).then((res)=>{
        console.log(res)
      })
    }
    console.log(user?.result)
    console.log("aaf")
    console.log(post)
    const likepost = async (id)=>{
   console.log("iii")
      axios.patch(`/${id}/likePost`).then((res)=>{
        console.log(res)
      })
    }
    const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
  return (
  
   <Card className={classes.card}>
    <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

<div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.name === post?.name || user?.result?._id === post._id) && (
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div>)}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => likepost(post._id)} disabled={!user?.result} >    <Likes /> </Button>
        
        {(user?.result?.name === post?.name || user?.result?._id === post._id) && (
        <Button size="small" color="secondary" disabled={!user?.result} onClick={() => deletepost(post._id)} >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
   

   </Card>

  )
}

export default Post