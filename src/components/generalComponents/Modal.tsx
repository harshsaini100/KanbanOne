import { useRef, useEffect } from "react"
export default function Modal({children, show, setShow}: {children: any, show: boolean, setShow: any}) {
    const ref = useRef<any>(null);
    
    useEffect(() => {
        if(ref.current){
            ref.current.addEventListener('click', (e) => {
                if(e.target.id === "modal-backdrop"){
                    setShow(false)
                }
            })
        }
    },[])

    return (
        <div 
            className="modal bg-black opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
            style={{display: show ? "block" : "none"}}
            ref={ref}
            id="modal-backdrop"
        >
            <div id="modal_card" className="opacity-100  bg-white rounded-lg">
                {children}
            </div>
        </div>
    )
}