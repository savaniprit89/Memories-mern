import axios from 'axios'

const instance =axios.create({
 
   baseURL:'http://localhost:9000'
   // baseURL:'https://memories-89.herokuapp.com'
})
instance.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
       req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export default instance;