import axios from "axios";

export default async function Balance({setBalance,navigate}){
   try{
     const token=localStorage.getItem('token');

     const response=await axios.get('http://localhost:3000/api/v1/account/balance',{
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