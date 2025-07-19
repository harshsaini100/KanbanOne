import { createContext, useEffect, useState } from "react";

const WakeupContext = createContext();

const WakeupProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const wakeupServer = async () => {
            setLoading(true)
            await fetch('https://kanbanoneapi.onrender.com/auth/wakeup')
            setLoading(false)    
        }
        wakeupServer()
    },[])
    return (
        <WakeupContext.Provider value={{loading}}>
            {children}
        </WakeupContext.Provider>
    )
}

export default WakeupProvider;