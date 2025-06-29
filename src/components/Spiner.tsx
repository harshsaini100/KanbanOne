export default function Spinner () {
    return (
        <div className="spinner flex items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    )
}