import Header from "../components/header"
import Form from "../components/form"
import Fotter from "../components/fotter"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signin(){
const navigate=useNavigate();
useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const res = await axios.get('http://localhost:3000/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.data.success) {
          navigate('/dashboard');
        }
      } catch (e) {
         if (e.response?.data?.error === 'Invalid or expired token') {
          localStorage.removeItem('token');
        }
      }
    };
  
    checkAuth();
  }, []);

    return(
        <div>
            <div className="bg-gray-300 h-screen w-screen flex justify-center items-center ">
                        <div className="bg-white h-auto w-[300px] rounded-lg shadow-sm shadow-black p-5">
                         <Header label={'Sign in'} subLabel={'Please enter your credentials to access your account'}></Header>
            
                         <Form type={'signin'} buttonText={'Sign in'}></Form>

                         <Fotter label={"Don't have an account?"} buttonText={'Sign up'} to={'/'}></Fotter>
                        </div>
                         
                    </div>
        </div>
    )
}