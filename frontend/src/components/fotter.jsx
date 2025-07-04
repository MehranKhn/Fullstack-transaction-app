import { Link } from "react-router-dom"

export default function Fotter({label,buttonText,to}){
    return(
        <div className="flex justify-center w-full text-center p-2 text-sm font-medium gap-1">
                 <span>{label}</span>
                 <Link className="text-blue-700 underline cursor-pointer" to={to}>{buttonText}</Link>
        </div>
    )
}