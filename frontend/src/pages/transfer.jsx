import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useRef, useState } from "react";

export default function Transfer(){
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const inputRef=useRef();
    const navigate=useNavigate()
    const[transferMessage,setTransferMessage]=useState('');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        async function initiateTransfer(userId) {
            const token=localStorage.getItem('token');
            try{
                const response=await axios.post(`${API_BASE_URL}/api/v1/account/transfer`,{
                    to:userId,
                    amount:inputRef.current.value,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                      
                    setTransferMessage(response.data.msg);

                    setTimeout(()=>{
                        navigate('/dashboard')
                    },1000);
            }
            catch(e){
                if(e.response.data.msg){

                    setTransferMessage(e.response.data.msg);
                }
                else if(e.response.data.error){
                    setTransferMessage(e.response.data.error);
                    navigate('/signin')
                }
            }
        }
            

    return(
        <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
                    <div className="flex flex-col bg-white shadow-lg shadow-white h-auto w-[350px] rounded-md">
                            <h1 className="text-lg font-bold text-center mb-10">Send Money</h1>
                            

                            

                            <div className="p-6 flex flex-col items-center gap-2">

                              <div className="flex gap-3 items-center mb-2 justify-center">
                                     <div className="w-[35px] h-[35px] rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-base font-semibold text-white ">{name[0].toUpperCase()}</span>
                                     </div>
                                     <h3 className="text-2xl font-semibold">{name}</h3>
                              </div>
                                <h3 className="font-semibold px-2 mb-1">Amount (in Rs)</h3>
                                 
                                 <div className="flex justify-center">
                                    <input ref={inputRef} type='number' placeholder="Enter amount" className="p-1 outline-none border  border-gray-200 rounded-md w-[280px] " required/>
                                 </div>

                                  <button onClick={(e)=>initiateTransfer(id)} className="w-[280px] bg-green-500 rounded-md p-1 text-white">Initiate Transfer</button>

                                  <div className="flex justify-center">
                                        <span className="text-green-500 text-lg font-semibold">{transferMessage}</span>
                                    </div>
                            </div>  
                    </div>
        </div>
    )
}