import { useState, useEffect } from 'react'
import Header from './components/Header'
import KanbanTypeContainer from './components/kanban components/KanbanTypeContainer'
import Modal from './components/generalComponents/Modal'
function App() {
 const [data,setData] = useState([])
 const [refetch,setRefetch] = useState(false)
 const [show,setShow] = useState(true)
 const todoItems = data.length > 0 ? data.filter((item) => item.type === 'todo') : []
 const inProgressItems = data.length > 0 ? data.filter((item) => item.type === 'inprogress') : []
 const completedItems = data.length > 0 ? data.filter((item) => item.type === 'complete') : []

 useEffect(()=>{
      const fetchData = async () => {
        const url = `http://localhost:5050/data/all_items`
        const res = await fetch(url)
        setData(await res.json())
      }
      fetchData()
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
  const AddBtn = <button className='cursor-pointer'><i className='fa fa-plus text-green-700'></i></button>
  const itesms = ['Red', 'Green', 'Blue'];
  return (
    <>
      <Header />
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
        <Modal show={show} setShow={setShow}>
          <div>
            <input type="text" placeholder='Enter task name' />
            <input type="text" placeholder='Enter task description' />
            <input type="text" placeholder='Enter task type' />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default App
