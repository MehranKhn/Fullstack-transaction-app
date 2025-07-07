import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function Auth({email,password,setSignupMessage,setShowMessage,navigate}){
    try{
        const response=await axios.post(`${API_BASE_URL}/api/v1/user/signin`,{
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
