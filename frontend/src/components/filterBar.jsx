import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function FilterBar(){
    const [users,setUsers]=useState([]);
    const [error,setError]=useState('');
    const [searchTerm,setSearchTerm]=useState('');
    const navigate=useNavigate();

    async function getUsers(filter){
        try{
            const response=await axios.get('http://localhost:3000/api/v1/user/bulk',{
            params: {
                filter: filter,
                userId:localStorage.getItem('userId')
            }
        })
            setUsers(response.data.users);
        }
        catch(e){
           setUsers([]);
           setError("Error finding the users")
        }
    }

    useEffect(()=>{
       const debounceDelay=setTimeout(()=>{
        getUsers(searchTerm);
      },500)

      return ()=> clearTimeout(debounceDelay);

    },[searchTerm])

    //intial load 
    useEffect(()=>{
        getUsers(searchTerm);
    },[])
            
    return(
        <div className="flex flex-col p-2">
             <h2 className="text-lg font-semibold mb-2">Users:</h2>

             <div className="w-full mb-2">
                <input type="text" placeholder="Search Users...." className="outline-none border border-gray-300 rounded-sm w-full p-1 px-2 text-gray-500" onChange={(e)=>{setSearchTerm(e.target.value)}} />
             </div>

             <div className="flex flex-col">
                {!error && users.map((user)=>{
                      return (
                      <div className="flex justify-between mb-2 " key={user._id}>
                             <div className="flex gap-2 items-center">
                                    <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-200 p-4">
                                           {user.name[0].toUpperCase()}
                                    </div>
                                    <span>{user.name}</span>
                             </div>
                             
                        <button onClick={()=>navigate(`/send?id=${encodeURIComponent(user._id)}&name=${encodeURIComponent(user.name)}`)} className="w-[100px] h-8 bg-black text-white rounded-md">Send Money </button>    
                      </div>)
                   })}
                   {error && <div className="text-red-500"> {error}</div>}
             </div>
        </div>
    )
}