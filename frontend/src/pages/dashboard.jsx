import { useEffect, useState } from "react"
import AppBar from "../components/appbar"
import Balance from "../components/balance";
import FilterBar from "../components/filterBar";
import { useNavigate } from "react-router-dom";
export default function Dashboard(){
   const [balance,setBalance]=useState(null);
   const navigate=useNavigate();
   useEffect(()=>{
     Balance({setBalance,navigate})
   },[])
    return (
        <div className="w-screen h-screen overflow-x-hidden flex flex-col">
            <AppBar></AppBar>
           <div className="flex flex-col mx-4">
                <div className="flex gap-2 items-center p-2">
                    <span className="text-lg font-medium">Balance:</span>
                    <p className="text-lg font-medium">{balance?`Rs ${balance}`:'NaN'}</p>
                </div>
                <FilterBar></FilterBar>
            </div> 
        </div>
    )
}
