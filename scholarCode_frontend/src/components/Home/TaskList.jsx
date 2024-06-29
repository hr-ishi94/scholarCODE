import React, { useState } from 'react'

const TaskList = ({module,tasks,reviewDate,currentDate}) => {
    const [checkedItems, setCheckedItems] = useState({})

    const handleCheckBox = (taskId) =>{
        setCheckedItems((prevState)=>({
            ...prevState,
            [taskId]:!prevState[taskId]
        }))
    }

    const areAllChecked = () =>{
        return tasks.filter((task)=>task.task_module === module ).every((task)=>checkedItems[task.id] === true)
    }
    console.log(areAllChecked(),'s')
  return (
    <>
         {
            
            tasks.filter((task)=>task.task_module === module).map((task,index)=>(
                <ul>
        
            <li className=''>
              <h4 key={index}> {task.name}
              <input 
              type="checkbox" 
              style={{width:"25px",height:"25px",marginLeft:"5px"}} 
              checked = {checkedItems[task.id] || false}
              onChange={()=>handleCheckBox(task.id)}
              />
              </h4>
              
            </li> 
          </ul>
          
              
              
              
              ))}
              {
                !areAllChecked() && (reviewDate === currentDate) &&
                <p className='text-danger'>
                    <i className="fa-solid fa-circle-exclamation"></i>  Complete all tasks now since your review is scheduled today
                </p> 
              }
    </>
  )
}

export default TaskList