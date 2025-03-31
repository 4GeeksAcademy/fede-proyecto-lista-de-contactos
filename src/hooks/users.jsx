import React from "react";
import { useEffect, useState } from "react"

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");


    
    useEffect(()=>{
        loadTasks()
    },[])


    function loadTasks () {
        fetch("https://playground.4geeks.com/todo/users/fede_ferreyra")
        .then(response=>{
            if(!response.ok){
                console.error(response.statusText, response.status)
                return
            }
            return response.json()
        }).then(dataJson=>{
            setTasks(dataJson.todos)
        })
        
    }

   
   
    function addTask() {
        if (newTask.trim() === "") return;
        
        const task = { label: newTask, done: false };
        
        fetch("https://playground.4geeks.com/todo/todos/fede_ferreyra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(() => {
            loadTasks(); // Recargar la lista de tareas después de agregar
            setNewTask(""); // Limpiar el input
        });
    }

    function deleteTask(taskId) {
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                loadTasks(); // Recargar la lista después de eliminar
            }
        });
    }

    return (
        <div className="text-center">
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Agregar nueva tarea"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addTask}>Agregar</button>
            </div>
            <ul className="list-group">
                
                {tasks.map(task=><li className="list-group-item d-flex justify-content-between align-items-center">{task.label}
                    <button className="btn btn-danger" onClick={() => deleteTask(task.id)} >Eliminar</button>
                </li>)}
            </ul>
        </div>
    )
}

export { App }



 /* const getUsers = async() => {
        const response = await fetch("https://playground.4geeks.com/todo/users");
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, []) */