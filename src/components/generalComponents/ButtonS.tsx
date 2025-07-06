export default function ButtonS({ children, onClick, className, color="primary", type }: {
    children: any,
    color?: "primary" | "danger" | "success",
    onClick?: any,
    className?: string,
    type?: any
}) {
    
    let btnColor = "indigo";
    if (color === "primary") {
        btnColor = "indigo";
    }else if(color === "danger") {
        btnColor = "red";
    }else if(color === "success") {
        btnColor = "green";
    }

    return (
        <button type={type || "button"} className={`transition duration-150 ease-in-out 
               active:scale-95 relative inline-block font-medium group py-1.5 px-2.5 cursor-pointer ${className}`} onClick={onClick}>
            <span className={`absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-${btnColor}-600 group-hover:-translate-x-0 group-hover:-translate-y-0`}></span>
            <span className={`absolute inset-0 w-full h-full bg-white border border-${btnColor}-600 group-hover:bg-$-50`}></span>
            <span className={`relative text-${btnColor}-600`}>{children}</span>
        </button>
    )
}