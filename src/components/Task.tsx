
import { Circle, CheckCircle, Trash } from 'phosphor-react'

import styles from './Task.module.css'


interface TaskProps {
  id: string;
  content: string;
  isChecked: boolean;
  onDeleteTask: (taskId: string) => void;
  onCheckTask: (taskId: string) => void;
  onUncheckTask: (taskId: string) => void;
}


export function Task({id, content, isChecked, onDeleteTask, onCheckTask, onUncheckTask }: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleCheckTask() {
    isChecked ? onUncheckTask(id) : onCheckTask(id)
  }

  return(
    <div className={`${styles.task} ${isChecked ? styles.checked : styles.unchecked}`}>

      <button className={`${styles.checkButton}`} onClick={handleCheckTask}>
        {isChecked ? (

          <CheckCircle size={24}/>

        ) : (
          
          <Circle size={24}/>

        )}
      </button>  


      <p>{content}</p>

      <button className={styles.deleteButton} onClick={handleDeleteTask}>
        <Trash size ={24}/>
      </button>

    </div>
  )
}