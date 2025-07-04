import axios from "axios";

export default async function Auth({email,password,setSignupMessage,setShowMessage,navigate}){
    try{
        const response=await axios.post('http://localhost:3000/api/v1/user/signin',{
         password,email
        });
         
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('userId',response.data.userId)
        setTimeout(()=>{
            navigate('/dashboard');
        },2000)
    }
    catch(e){
        setSignupMessage(e.response.data.msg|| "Login failed");
        setShowMessage(true);
        setTimeout(()=>{
            setShowMessage(false);
        },4000)
    }
}
