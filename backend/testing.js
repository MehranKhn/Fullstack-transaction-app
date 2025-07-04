const axios=require('axios');

async function axiosCheck(){
    try{
        const response= await axios.post('http://localhost:3000/api/v1/user/signup',{
              
                name: "Mehran",
                email: "abbb@gmail.com",
                password: "Mehran@12"
              });
         console.log(response.data.msg);
    }
     catch(e){
        console.log(e.response.data.msg)
     }
}
axiosCheck(); 