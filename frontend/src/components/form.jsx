import { useRef, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "./authenticate";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Form({type,buttonText}){
    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');

    const[showMessage,setShowMessage]=useState(false);
    
    const navigate=useNavigate();

    const [signupMessage,setSignupMessage]=useState('');
    const [failedSignupMessage,setFailedSignupMessage]=useState('');

            async function handleSubmit(e){
                 e.preventDefault();
                try{
                    const response= await axios.post(`${API_BASE_URL}/api/v1/user/signup`,{
                         name:name,
                         email:email,
                         password:password
                     });
                     
                    
                         setSignupMessage(response.data.msg);

                         setShowMessage(true);

                         setTimeout(()=>{
                            setSignupMessage('')
                            setShowMessage(false);
                            navigate('/signin');
                        },4000);

                }
                 catch(e){
                    
                      setFailedSignupMessage(e.response.data.msg);
                       setShowMessage(true);
                        setTimeout(()=>{
                            setFailedSignupMessage('')
                            setShowMessage(false)
                        },4000);
                    }
            }

      async function handleSignin(e){
        e.preventDefault();
       await Auth({
            email,
            password,
            setShowMessage,
            setSignupMessage,
            navigate
        })
      }

      return (
        <form onSubmit={type==='signup'?handleSubmit:handleSignin} className="mb-1">

           {type==='signup' && 
                <div className="mb-3">
                    <label htmlFor="name" className="text-sm font-semibold">Name:</label> <br />

                    <input onChange={(e)=> setname(e.target.value)} type="text" id="name" name="name" placeholder="Mehran khan" className="outline-none border border-gray-200 rounded-sm p-1 w-full text-sm font-medium "/> 
                    
                </div>
            }
            
             <div className="mb-3">
                <label htmlFor="email" className="text-sm font-semibold">Email:</label> <br />

                <input onChange={(e)=> setemail(e.target.value)} type="email" id="email" name="email" placeholder="Mehrankhan@gmail.com" autoComplete="email" className={`outline-none border border-gray-200 rounded-sm p-1 w-full text-sm font-medium `}/> <br />


                     
                    <div className={`transition-all duration-500 ${showMessage?'max-h-10 opacity-100':'max-h-0 opacity-0'}`}>
                        <span className={`text-sm text-red-500 `}>{failedSignupMessage}</span>
                     </div>
             </div>

            <div className="mb-1">
                <label htmlFor="password" className="text-sm font-semibold">Password:</label> <br />

                <input onChange={(e)=> setpassword(e.target.value)} type="password" id="password" name="password" placeholder="Mehran@12xt" className="outline-none border border-gray-200 rounded-sm p-1 w-full text-sm font-medium " required/> <br />
            </div>
            
                {type==='signin' && <div className={`mb-4  transition-all duration-500 ${showMessage?'max-h-10 opacity-100':'max-h-0 opacity-0'}`}>
                    <span className="text-sm text-red-500 ">{signupMessage}</span>
                </div> }

                <button  type="submit" className="bg-black p-1 w-full text-center text-white font-medium rounded-sm mb-2">{buttonText}</button>

           
                {type==='signup' && <div className={`text-center transition-all duration-500 ${showMessage?'max-h-10 opacity-100':'max-h-0 opacity-0'}`}>
                    <span className="text-sm text-green-500 ">{signupMessage}</span>
                </div> }
        </form>
      )
}



