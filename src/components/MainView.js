import TaskItem from "./TaskItem";
import { db, auth } from '../firebase';
import { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore';

function MainView() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addNewTask = async (e) => {
        e.preventDefault();
        if (auth.currentUser.emailVerified===false){
            alert('You must sign-in to add tasks.')
            return;
        }
        if (taskInput === ""){
            alert('Cannot add an empty task.');
            return;
        }
        await addDoc(collection(db, 'taskList'), {
            task: taskInput,
            time: Timestamp.now(),
            author: localStorage.getItem('name'),
            completed: false
        })
        setTaskInput(''); 
    };

    useEffect(() => {
        const q = query(collection(db, 'taskList'), orderBy('time'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let taskArray = [];
            querySnapshot.forEach((task) => {
                taskArray.push({...task.data(), id: task.id})
            })
            setTasks(taskArray);
        });
        return () => unsubscribe();
    }, [])
    
    return(
        <div className="position: absolute top-0 left-0 h-[100%] w-[100%] bg-red-100">
        {tasks.map((task, index) => (
                        <TaskItem key={index} task={task}/>
                    ))}
            <form onSubmit={addNewTask} className="bg-slate-300 h-[6%] w-[100%] flex p-1">
                <input className='w-[85%]' type='text' value={taskInput} placeholder="Create a new task..." onChange={(e)=>{
                    setTaskInput(e.target.value);
                }}></input>
            </form>
        </div>
    )
}

export default MainView;