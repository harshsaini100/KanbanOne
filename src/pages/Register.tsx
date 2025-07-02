import { useState } from "react"
import { FormMethod, Link } from "react-router-dom"
import useAppDispatch from "../store/useAppDispatch"
import { login } from "../store/auth/authSlice"
import { useNavigate } from "react-router-dom"
export default function Register() {
    const navigate = useNavigate()
    const [registerDetails, setRegisterDetails] = useState({ name: '', email: '', password: '' })
    const dispatch = useAppDispatch()
    const handleRegister = async (e: any) => {

        e.preventDefault();

        const url = `${import.meta.env.VITE_API_BASE_URI}/auth/register`
        const res = await fetch(url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerDetails)
            })
        
        if(res.ok){
            
            const loginData : any = {
                email: registerDetails.email,
                password: registerDetails.password
            }

            dispatch(login(loginData)).then((res: any) => {
                   if(res.meta.requestStatus == "fulfilled"){
                       navigate("/")
                   } 
            }).catch((er)=>{

            })
            
        }


        // setShowRegister(false)
    }
    return (
        <>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white w-42"
                    >
                        <img
                            className=""
                            src={'/logo.png'}
                            alt="logo"
                        />
                        <p className="text-black">KANBAN ONE</p>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-teal-200 to-lime-200 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                Register
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        value={registerDetails.name}
                                        onChange={(e) => setRegisterDetails({ ...registerDetails, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        value={registerDetails.email}
                                        onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={registerDetails.password}
                                        onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })}
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="w-full cursor-pointer bg-amber-500 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Register
                                </button>
                                <p className="text-sm font-light text-black dark:text-black">
                                    Already have an account?{" "}
                                    <Link
                                        to={"/login"}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}