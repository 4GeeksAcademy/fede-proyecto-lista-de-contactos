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

   
    function createUserAndAddTask(task) {
        fetch("https://playground.4geeks.com/todo/users/fede_ferreyra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([])
        })
        .then(response => {
            if (response.ok) {
                addTask(task);
            }
        });
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
        
        .then(response => {
            if (response.ok) {
                loadTasks(); // Recargar la lista de tareas después de agregar
                setNewTask(""); // Limpiar el input
            } else {
                createUserAndAddTask(task.label);
            }
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

    function deleteAllTasks() {
        fetch("https://playground.4geeks.com/todo/users/fede_ferreyra", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                setTasks([]); // Vaciar la lista en la interfaz
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
                {/* Aqui ira la lista q se renderizara o no */}
                {tasks.length === 0 ? (
                    <p>No hay tareas</p>
                ) : (
                    <ul className="list-group">
                        {tasks.map(task=><li className="list-group-item d-flex justify-content-between align-items-center">
                            {task.label}<button className="btn btn-danger" onClick={() => deleteTask(task.id)} >Eliminar</button>
                        </li>)}
                    </ul>)}
                
            
            {tasks.length > 0 && (<button className="btn btn-danger mt-2 ms-2" onClick={deleteAllTasks}>Eliminar Todas</button>)}
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