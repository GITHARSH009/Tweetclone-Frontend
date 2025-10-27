import "./ToDoList.css";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from "react";

const ToDoList=()=>{
  const initialArray=localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
  const [list,setList]=useState(initialArray);
  const [task,setTask]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(task.trim()==="") return;
    const newTask={
      task:task,
      status:"pending",
      addedAt:new Date().toISOString()
    }
    const updatedList=[...list,newTask];
    setList(updatedList);
    localStorage.setItem("list",JSON.stringify(updatedList));
    setTask("");
  }

  const completeTask=(index)=>{
    const taskList=list[index];
    if(taskList.status==="pending"){
        alert("🎉 Congrats! The task is completed!");
    }
    else{
       alert("❌ You Failed!");
    }
    const updatedList=list.filter((val,i)=>i!==index);
    setList(updatedList);
    localStorage.setItem("list",JSON.stringify(updatedList));
  }

  const getTimeRemaining = (addedAt) => {
  const deadline = new Date(addedAt).getTime() + (24 * 60 * 60 * 1000);
  const now = new Date().getTime();
  const diff = deadline - now;
  
  if (diff <= 0) return "Expired";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }
  return `${minutes}m left`;
}

  useEffect(()=>{
    const checkDealine=()=>{
      const now=new Date().getTime();
      const updatedList=list.map((item)=>{
        if(item.status==="pending"){
        const taskDate=new Date(item.addedAt).getTime()+(24*60*60*1000);
        if(now>taskDate){
          return {...item,status:"failed"};
        }
        }
        return item;
      });

      const hasChanged=updatedList.some((item,index)=>item.status!==list[index].status);
      if(hasChanged){
        setList(updatedList);
        localStorage.setItem("list",JSON.stringify(updatedList));
      }
    }
      checkDealine();
      const regularInterval=setInterval(checkDealine,60*60*1000); // Check every hour
      return ()=>clearInterval(regularInterval);
  },[list]);

     return (
  <div className="todomain">
    <div className="todo-container">
      {/* Header */}
      <div className="todo-header">
        <h1 className="headingstart">Your Todo List</h1>
        <h2 className="subheadingstart">Stay organized and get things done</h2>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Add a new task..."
            className="taskinputstart"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <button className="add-task-btn" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="listcontainerstart">
        {list.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p className="empty-text">No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          list.map((item, index) => {
            return (
              <div
                className={`taskitemstart ${
                  item.status === "failed" ? "failed" : ""
                }`}
                key={index}
              >
                <div className="task-content">

                  {/* Task Info */}
                  <div className="task-info">
                    <span className="tasktextstart" style={{"marginLeft":"1.6rem"}}>{item.task}</span>
                    <div className="task-meta">
                      <span className="task-deadline" style={{"marginLeft":"1.6rem"}}>
                        <svg
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {getTimeRemaining(item.addedAt)}
                      </span>
                      <span
                        className={`task-status ${
                          item.status === "pending"
                            ? "status-pending"
                            : "status-failed"
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Complete Button */}
                  <button
                    className={`complete-btn ${
                      item.status === "failed" ? "failed-btn" : ""
                    }`}
                    onClick={() => completeTask(index)}
                  >
                    <CheckCircleIcon />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Stats */}
      {list.length > 0 && (
        <div className="stats-section">
          <div className="stats-content">
            <span style={{"color":"orange"}}>
              {list.filter((item) => item.status === 'pending').length} pending
            </span>
            <span style={{"color":"red"}}>
              {list.filter((item) => item.status === 'failed').length} failed
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default ToDoList;