
export default function AppBar(){
    return(
        <div className="flex justify-between border-b border-gray-300 px-5 py-2 items-center inset-shadow-sm mb-2">
               <div className="flex items-center ">
                  <span className="text-lg font-semibold">PayTM App</span>
               </div>

               <div className="flex gap-2 items-center ">
                 <span className="font-medium">Hello</span>

                 <div className="flex items-center font-medium text-lg rounded-full bg-gray-100 w-[40px] h-[40px] p-2 justify-center">
                 U </div> 
               </div>
        </div>
    )
}