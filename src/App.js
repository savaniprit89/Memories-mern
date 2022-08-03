import './App.css';
import {Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route,Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import Auth from './Auth';
function App() {
 

 
  return (
 
   <BrowserRouter>
    <Container maxWidth="lg">
   
      <Navbar />
     
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/auth" element={<Auth/>}/>
         
        </Routes>
      
       
      
    </Container>
  </BrowserRouter>

  );
}

export default App;
//@material-ui/core
//xs 12 means full width on small device
//sm 7 out of fall space on larger device
