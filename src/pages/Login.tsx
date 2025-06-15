export default function Login() {
    return (
        <>
            <div className="flex justify-center items-center h-full w-full">
                <div className="flex flex-col justify-center items-center gap-2 h-full w-full">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <div className="h-80 w-xl shadow-black shadow-lg p-3 rounded-2xl flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xl">Email</label>
                            <input className="form-field" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xl">Password</label>
                            <input className="form-field" />
                        </div>
                        <div className="flex justify-center w-full">
                        <div className="w-8">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}