import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function Balance({setBalance,navigate}){
   try{
     const token=localStorage.getItem('token');

     const response=await axios.get(`${API_BASE_URL}/api/v1/account/balance`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
     });
     setBalance(response.data.balance);
   }
   catch(e){
        if(e.response?.data?.msg){
          setBalance(e.response.data.msg);
        }
        else if(e.response.data.error==='Invalid or expired token'){
            localStorage.removeItem('token');
            navigate('/signin');
        }
   }
}