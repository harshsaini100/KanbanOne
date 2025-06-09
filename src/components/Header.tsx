export default function Header() {
    return (
        <header className="w-full p-0 m-0">
            <nav className="flex justify-between py-2 px-4">
                <div className="logo h-1 w-1">Logo</div>
                <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded">
                        Login
                    </button>
                     <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded">
                        Signup
                    </button>
                </div>
            </nav>            
        </header>
    )
}