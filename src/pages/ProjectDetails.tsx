import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../store/useAppDispatch';
import { getProject } from '../store/projects/projectsSlice';
import { useSelector } from 'react-redux';
import { addBoard, getAllBoards } from '../store/boards/boardsSlice';
import BoardCard from '../components/BoardCard';
export default function ProjectDetails() {
    const {project} = useSelector((state:any)=>state.projects)
    const {items} = useSelector((state:any)=>state.boards)
    console.log(project) 
    const { id } : any = useParams();
     const dispatch = useAppDispatch();

     const [newBoard,setNewBoard] = useState<any>({name: "", description: ""})

     useEffect(()=>{
        dispatch(getProject(id))
        dispatch(getAllBoards(id))
     },[id])

     const createNewBoard = () => {
        dispatch(addBoard({...newBoard,project: id}))
        setNewBoard({name: "", description: ""})
     }

    return (
        <div className='lg:px-40'>
            <h1 className='heading text-2xl'>{project?.name}</h1>
            <p>{project?.description}</p>
            <div className='mt-3'>
                <h2 className='text-xl font-bold'>Boards</h2>
                <h3>Create New</h3>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-3'>
                    <input className='form-field' value={newBoard.name} onChange={(e) => setNewBoard({...newBoard,name: e.target.value})} placeholder='Board Name'/>
                     <input className='form-field' value={newBoard.description} onChange={(e) => setNewBoard({...newBoard,description: e.target.value})} placeholder='Description'/>
                    <button className='btn' onClick={()=>{createNewBoard()}}>Create</button>
                </div>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-3'>
                    {items && items.map((item:any) => <BoardCard item={item}/>)}
                </div>
            </div>
        </div>
    );
}