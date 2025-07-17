import { useState } from "react"
import useAppDispatch from "../store/useAppDispatch"
import { deleteProject } from "../store/projects/projectsSlice"
import { Link } from "react-router-dom"
export default function BoardCard({item}:any) {
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(deleteProject(item._id))   
    }
    const [show, setShow] = useState(false)
    return (
        <div
            className={`hover:scale-105 min-w-2xs project-card task-card w-full rounded max-w-2xs shadow-lg bg-white`}>
            <div className='flex items-center p-2 task-card-title h-10'>
                <div className="flex justify-between items-center w-full">
                    <h1 title={""} className='truncate text-lg font-bold cursor-pointer'><Link to={`/board/${item._id}`}>{item?.name}</Link></h1>
                    <span className="text-red-600 cursor-pointer" onClick={handleDelete}><i className="fa fa-trash"></i></span>
                </div>
            </div>
            <div className='task-card-body p-2'>
                <ol>
                    <li>All Tasks: {item?.totalTasks ?? 0}</li>
                    <li>To Do Tasks: {item?.todoTasks ?? 0}</li>
                    <li>In Progress: {item?.inProgressTasks ?? 0}</li>
                    <li>Completed: {item?.completedTasks ?? 0}</li>
                </ol>
            </div>
        </div>
    )
}