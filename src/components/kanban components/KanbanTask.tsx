import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../../store/tasks/tasksSlice';
import useAppDispatch from '../../store/useAppDispatch';
import Modal from '../generalComponents/Modal';
import { updateStatus } from '../../store/tasks/tasksSlice';
export default function KanbanTaskCard({ id, type, title, description }: { id: any; type: "todo" | "inprogress" | "complete", title: string, description: string }) {
    const arrowRefR = useRef<any>(null);
    const arrowRefL = useRef<any>(null);
    const { user } = useSelector((state: any) => state.auth)
    const [show, setShow] = useState(false)

    const shadow = type === "todo" ? "shadow-rose-500" : type === "inprogress" ? "shadow-yellow-500" : "shadow-green-500";
    const dispatch = useAppDispatch()
    const handleDelete = () => {
        dispatch(deleteTask(id))
    }

    const handleMouseOver = () => {
        if (arrowRefR.current) {
            arrowRefR.current.classList.add('opacity_one')
        }
        if (arrowRefL.current) {
            arrowRefL.current.classList.add('opacity_one')
        }
    }

    const handleMouseOut = () => {
        if (arrowRefR.current) {
            arrowRefR.current.classList.remove('opacity_one')
        }
        if (arrowRefL.current) {
            arrowRefL.current.classList.remove('opacity_one')
        }
    }

    const handleArrowClick = (action: "left" | "right") => {
        let updateType = "";
        if(type === "todo" && action === "left") return
        if(type === "complete" && action === "right") return
        if (action == "left") {
            updateType = type === "inprogress" ? "todo" : type === "complete" ? "inprogress" : "";
        } else {
            updateType = type === "todo" ? "inprogress" : type === "inprogress" ? "complete" : "";
        }
        const post: any = {
            id: id,
            payload: { type: updateType }
        }
        dispatch(updateStatus(post))
    }

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={`relative task-card w-full rounded ${shadow} shadow-md bg-white `} /*onClick={() => setShow(true)}*/>
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
            {type != "complete" && <div onClick={() => handleArrowClick("right")} className='cursor-pointer task_arrow task_arrow_right' ref={arrowRefR}><i className='fa fa-arrow-right'></i></div>}
            {type != "todo" && <div onClick={() => handleArrowClick("left")} className='cursor-pointer task_arrow task_arrow_left' ref={arrowRefL}><i className='fa fa-arrow-left'></i></div>}
        </div>
    )
}