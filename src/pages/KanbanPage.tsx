import { useState, useEffect } from 'react'
import KanbanTypeContainer from '../components/kanban components/KanbanTypeContainer'
import Modal from '../components/generalComponents/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTasks, updateStatus } from '../store/tasks/tasksSlice'
import useAppDispatch from '../store/useAppDispatch'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { addTask } from '../store/tasks/tasksSlice'
import Spinner from '../components/Spiner'
function KanbanPage() {

 const data = useSelector((state:any) => state.tasks.items)
 const {loading} = useSelector((state:any) => state.tasks)
 const {user} = useSelector((state:any) => state.auth)
 const [refetch,setRefetch] = useState(false)
 const [show,setShow] = useState(false)
 
 const [item, setItem] = useState<any>({
   title: "",
   type: "",
   description: "",
 });

 // fitler out items based on type
 const todoItems = data.length > 0 ? data.filter((item) => item.type === 'todo') : []
 const inProgressItems = data.length > 0 ? data.filter((item) => item.type === 'inprogress') : []
 const completedItems = data.length > 0 ? data.filter((item) => item.type === 'complete') : []

const dispatch = useAppDispatch()

 useEffect(()=>{
      dispatch(getAllTasks())
  },[refetch])

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDropItem = (item) => {
    console.log(item)
    const [id, type] = item.split('-');
    console.log(id,type)
    const post : any = {
      id:id,
      payload:{type:type}
    }
    dispatch(updateStatus(post))
  
    // updateStatus()
  };

  const handleSave = () => {
    
    dispatch(addTask(item)).then((res)=>{
      if(res.meta.requestStatus == "fulfilled"){
        setRefetch(!refetch)
      }
    }).catch((er)=>{
      console.log(er)
    })
       
    setShow(false)
  }

  const AddBtn = <button className='cursor-pointer' onClick={()=>setShow(true)}><i className='fa fa-plus text-green-700'></i></button>
  

  return (
    <>
     {loading && <Spinner />}
      <div className='main px-40 h-full'>
        <div className='flex gap-2 justify-center h-full'>
          {/* To do card */}
          <KanbanTypeContainer        
            type="todo"   
            title="To Do" 
            icon='fa fa-clipboard-list' 
            color='red' 
            action={AddBtn} 
            onDropItem={handleDropItem}
            items={droppedItems}
            initialItems={todoItems} 
          />
          
          {/* In progress card */}
          <KanbanTypeContainer
            type="inprogress"
            title='In Progress'
            icon='fa fa-spinner'
            color='yellow'
            onDropItem={handleDropItem}
            items={droppedItems}
            initialItems={inProgressItems}
          />

          {/* Completed card */}
          <KanbanTypeContainer 
            type="complete"
            title='Completed' 
            icon='fa fa-check' 
            color='green' 
            onDropItem={handleDropItem}
            items={droppedItems}
            initialItems={completedItems}  
          />
        </div>
       
        <Modal show={show} setShow={setShow} title="Add Task" size='sm' action={handleSave}>
          <div className='flex gap-2 flex-col'>
            <input 
              type="text" 
              placeholder='Enter task name' 
              className='form-field' 
              value={item.title} 
              onChange={(e)=>setItem({...item,title:e.target.value})}
            />
            <textarea 
              placeholder='Enter task description' 
              className='form-field'
              value={item.description} 
              onChange={(e)=>setItem({...item,description:e.target.value})}
            ></textarea>
            <select 
              className='form-field'
              value={item.type} 
              onChange={(e)=>setItem({...item,type:e.target.value})}
            >
              <option value={""}>Select a task type</option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="complete">Completed</option>
            </select>
          </div>
        </Modal>
      </div>
    </>
  )
}


export default KanbanPage;