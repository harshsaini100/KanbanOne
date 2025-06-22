import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../../store/tasks/tasksSlice';
import  useAppDispatch from '../../store/useAppDispatch';
import Modal from '../generalComponents/Modal';
export default function KanbanTaskCard({ id, type, title, description }: { id: any; type: "todo" | "inprogress" | "complete", title: string, description: string }) {
    const {user} = useSelector((state:any)=>state.auth)
    const[show,setShow]= useState(false)
    
    const shadow = type === "todo" ? "shadow-rose-500" : type === "inprogress" ? "shadow-yellow-500" : "shadow-green-500";
    const dispatch = useAppDispatch()
    const handleDelete = () => {
        dispatch(deleteTask(id))       
    }

    console.log(user)
  
    return (
        <div className={`task-card w-full border-green border-1 rounded ${shadow} shadow-sm bg-white cursor-pointer` } onClick={() => setShow(true)}>
            <div className='flex items-center p-2 task-card-title border-b-2 border-b-black h-10'>
                <div className="flex justify-between items-center w-full">
                    <h1 title={title} className='truncate'>{title}</h1>
                    <span className="text-red-600 cursor-pointer" onClick={handleDelete}><i className="fa fa-trash"></i></span>
                </div>
            </div>
            <div className='task-card-body'>
                <p className='p-2 truncate text-left'>{description}</p>
            </div>
            <Modal show={show} title={title ? title : "Task Details"} setShow={setShow}>
                <div className='text-left flex flex-col'>
                <p>
                    Description: {description}
                </p>
                <p>
                    Type: {type === "todo" ? "To Do" : type === "inprogress" ? "In Progress" : "Completed"}
                </p>
                <p className='capitalize'>
                    Created By: {user?.name}
                </p>
                </div>
            </Modal>
        </div>
    )
}