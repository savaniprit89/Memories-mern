import React, { useEffect, useState }  from 'react'
import {Container ,AppBar ,Typography,Grow,Grid, Paper } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles'
import Pagination from './pagination/Pagination'

function Home() {
    const[currentId,setCurrentId]=useState(null)
 
 
    useEffect(()=>{
      
    },[currentId])

  const classes=useStyles();
  return (
    <Grow in>
<Container>
  <Grid container justify='space-between' className={classes.maincontainer} alignItems='stretch' spacing={3}>
<Grid item xs={12} sm={7} >
<Posts setCurrentId={setCurrentId} currentId={currentId}/>
</Grid>
<Grid item xs={12} sm={4} >
<Form currentId={currentId} setCurrentId={setCurrentId}/>
<Paper elevation={6}>
  <Pagination />
</Paper>
</Grid>
  </Grid>
</Container>

</Grow>
  )
}

export default Home