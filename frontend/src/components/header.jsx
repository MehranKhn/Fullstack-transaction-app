
export default function Header({label,subLabel}){
    return (
        <div className=" flex flex-col items-center text-center mb-3">
            <span className="text-2xl font-semibold p-2">{label}</span>
             <span className="text-sm text-gray-700">{subLabel}</span>
        </div>
    )
}
