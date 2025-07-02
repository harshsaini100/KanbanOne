export default function SimpleCard({children,title,handleDelete}: any) {
    return (
        <div className="relative task-card border-green border-1 rounded  shadow-sm bg-white cursor-pointer w-1/2">
            <div className='flex items-center p-2 task-card-title border-b-2 border-b-black h-10'>
                <div className="flex justify-between items-center w-full">
                    <h1 title={title} className='truncate'>{title}</h1>
                    <span className="text-red-600 cursor-pointer" onClick={handleDelete}><i className="fa fa-trash"></i></span>
                </div>
            </div>
            <div className="p-2">
                {children}
            </div>
        </div>
    )
}