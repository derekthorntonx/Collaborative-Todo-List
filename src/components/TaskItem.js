import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
function TaskItem( {task} ) {

    const handleCompletion = async(task) => {
        await updateDoc(doc(db,'taskList', task.id), {
            completed: !task.completed
        })
    }


    const deleteTask = async(id) => {
        await deleteDoc(doc(db, 'taskList', id))
    }

    return(
        <div className={task.completed ? "bg-slate-600 h-[6%] w-[100%] flex p-1" : "bg-slate-300 h-[6%] w-[100%] flex p-1"}>
            <div className={task.completed ? "bg-slate-500 w-[100%] flex align-center gap-10 line-through p-3" : "bg-white w-[100%] flex align-center gap-10 p-3"}>
                <input type='checkbox' onChange={(e) => {
                    if (e.currentTarget.checked){handleCompletion(task)}
                    else{handleCompletion(task)}
                }}/>
                <span className='w-[75%] overflow-hidden text-ellipsis'>{task.task}</span>
                <span>Author: {task.author}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
        </div>
    )
}

export default TaskItem;