export default function KanbanTaskCard({id, type, title, description}: {id:any; type: "todo" | "inprogress" | "complete", title: string, description: string}) {
    const shadow = type === "todo" ? "shadow-rose-500" : type === "inprogress" ? "shadow-yellow-500" : "shadow-green-500";
    
    const handleDelete = () => {
        const url = `http://localhost:5050/data/delete/${id}`
        fetch(url, {method:'DELETE'})
    }

    return (
      <div className={`task-card w-full border-green border-1 rounded ${shadow} shadow-sm bg-white`}>
                <div className='flex items-center p-2 task-card-title border-b-2 border-b-black h-10'>
                   <div className="flex justify-between items-center w-full">
                     <h1 title={title} className='truncate'>{title}</h1>
                    <span className="text-red-600 cursor-pointer" onClick={handleDelete}><i className="fa fa-trash"></i></span>
                    </div>
                </div>
                <div className='task-card-body'>
                    <p className='p-2 truncate text-left'>{description}</p>
                </div>
            </div>
 )
}