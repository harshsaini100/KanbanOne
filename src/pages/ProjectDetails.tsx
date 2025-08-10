import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../store/useAppDispatch';
import { getProject } from '../store/projects/projectsSlice';
import { useSelector } from 'react-redux';
import { addBoard, getAllBoards } from '../store/boards/boardsSlice';
import BoardCard from '../components/BoardCard';
import Spinner from '../components/Spiner';
import BreadCrumb from '../components/BreadCrumb';
import ButtonS from '../components/generalComponents/ButtonS';
import { toast } from 'react-toastify';
import { toastParameters } from '../utilities/constants';
export default function ProjectDetails() {
    
    const {project, loading} = useSelector((state:any)=>state.projects)
    const {items, loading: loadingBoards} = useSelector((state:any)=>state.boards)
    
    const { id } : any = useParams();
     const dispatch = useAppDispatch();

     const [newBoard,setNewBoard] = useState<any>({name: "", description: ""})

     useEffect(()=>{
        dispatch(getProject(id))
        dispatch(getAllBoards(id))
     },[id])

     const createNewBoard = () => {
        if(!newBoard.name) {
            toast.error("Please provide a name", toastParameters)
            return
        }
        dispatch(addBoard({...newBoard,project: id})).then((res)=>{
            if(res.meta.requestStatus === "fulfilled"){
              toast.success("Board added successfully",toastParameters)
            }else{
              toast.error("Something went wrong",toastParameters)
            }
        }).catch(er => {toast.error("Something went wrong",toastParameters)})
        setNewBoard({name: "", description: ""})
     }

    return (
        <>
        {loading || loadingBoards && <Spinner />}
        <div className='lg:px-40'>
            <BreadCrumb items={[{name: "Projects", link: "/projects"},{name: project?.name}]}/>
            <h1 className='heading text-2xl'>{project?.name}</h1>
            <p>{project?.description}</p>
            <div className='mt-3'>
                <h2 className='text-xl font-bold'>Boards</h2>
                <h3>Create New</h3>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-3'>
                    <input className='form-field bg-white' value={newBoard.name} onChange={(e) => setNewBoard({...newBoard,name: e.target.value})} placeholder='Board Name'/>
                     <input className='form-field bg-white' value={newBoard.description} onChange={(e) => setNewBoard({...newBoard,description: e.target.value})} placeholder='Description'/>
                    <ButtonS className='btn' onClick={()=>{createNewBoard()}}>Create</ButtonS>
                </div>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-3'>
                    {items && items.map((item:any) => <BoardCard item={item}/>)}
                </div>
            </div>
        </div>
        </>
    );
}