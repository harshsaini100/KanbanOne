import { useState, useEffect } from 'react'
import Header from './components/Header'
import KanbanTypeContainer from './components/kanban components/KanbanTypeContainer'
import Modal from './components/generalComponents/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTasks } from './store/tasks/tasksSlice'
function App() {
 const data = useSelector((state) => state.tasks.items)
//  const [data,setData] = useState([])
 const [refetch,setRefetch] = useState(false)
 const [show,setShow] = useState(true)
 const [item, setItem] = useState({
   id: "",
   title: "",
   type: "",
   description: "",
 });
 const todoItems = data.length > 0 ? data.filter((item) => item.type === 'todo') : []
 const inProgressItems = data.length > 0 ? data.filter((item) => item.type === 'inprogress') : []
 const completedItems = data.length > 0 ? data.filter((item) => item.type === 'complete') : []
const count = useSelector((state) => state.tasks.value)
const dispatch = useDispatch()

 useEffect(()=>{
      dispatch(getAllTasks())
  },[refetch])

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDropItem = (item) => {
    console.log(item)
    const [id, type] = item.split('-');
    console.log(id,type)
    const updateStatus = async () => {
      const url = `http://localhost:5050/data/updateStatus/${id}`
      const res = await fetch(url,
        {
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({type:type})
        })
      setRefetch(!refetch)
    }
    updateStatus()
    // setDroppedItems((prev) => [...prev, item]);
  };

  const handleSave = () => {
    const addTask = async () => {
      const url = `http://localhost:5050/data/add`
      const res = await fetch(url,
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(item)
        })
      setRefetch(!refetch)
    }
    addTask()
    setShow(false)
  }

  const AddBtn = <button className='cursor-pointer' onClick={()=>setShow(true)}><i className='fa fa-plus text-green-700'></i></button>
  const itesms = ['Red', 'Green', 'Blue'];

  return (
    <>
      <Header />
      <div className='main px-40 h-full'>
        <div className='flex gap-2 justify-center h-full'>
          Count : {count}
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
              type="text" 
              placeholder='Enter task type' 
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

export default App
