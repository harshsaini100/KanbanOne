import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header className="w-full p-0 m-0 absolute">
            <nav className="flex justify-between py-2 px-4">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="flex gap-2">
                     <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded cursor-pointer" to="/login">Login</Link>
                    
                     <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded cursor-pointer">
                        Signup
                    </button>
                </div>
            </nav>            
        </header>
    )
}