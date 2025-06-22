// import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout } from "../store/auth/authSlice"
import { useNavigate } from "react-router-dom"
import useAppDispatch from "../store/useAppDispatch"
export default function Header() {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {isAuthenticated} = useSelector((state: any) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')

    }
    
    return (
        <header className="w-full p-0 m-0">
            <nav className="flex justify-between py-2 px-4">
                <div className="logo">
                    <img src={'/logo.png'} alt="logo" />
                </div>
                <div className="flex gap-2">
                     {isAuthenticated ? 
                      <button onClick={handleLogout} className="cursor-pointer px-2 py-1 text-black rounded text-center">
                        Logout<i className="ms-1 fa fa-arrow-right"></i>
                    </button> : 
                    <Link to="/login" className="px-2 py-1 bg-green-600 text-white rounded">Login</Link>}
                </div>
            </nav>            
        </header>
    )
}