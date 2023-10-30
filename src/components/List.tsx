
import { PlusCircle, ClipboardText } from 'phosphor-react'
import uuidv4 from 'react-uuid'

import styles from './List.module.css'
import { Task } from './Task'
import { useState, FormEvent, ChangeEvent } from 'react'


export interface TaskType {
  id: string;
  content: string;
  isChecked: boolean;
}


export function List () {

  const [tasks, setTasks] = useState<TaskType[]>([])

  const [checkedTasks, setCheckedTasks] = useState<TaskType[]>([])

  const [newTask, setNewTask] = useState('')

  const [noTask, setNoTask] = useState(true);

  const taskList = noTask ? styles.noTasks : styles.yesTasks;


  function handleCreateNewTask(content: string, isChecked: boolean, event: FormEvent) {
    event.preventDefault()

    const addedTask = {
      id: uuidv4(),
      content,
      isChecked,
    };

    setTasks([...tasks, addedTask]);
    setNewTask('');
    if (noTask == true) {setNoTask(false)}
  }


  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value);
    
  }


  function deleteTask(taskToDeleteId: string) {

    const tasksWithoutDeleted = tasks.filter(task =>{
      return task.id !== taskToDeleteId;
    })

    setTasks(tasksWithoutDeleted);
  }

  function deleteCheckedTask(taskToDeleteId: string) {

    const tasksWithoutDeleted = checkedTasks.filter(task =>{
      return task.id !== taskToDeleteId;
    })

    setCheckedTasks(tasksWithoutDeleted);
  }


  function checkTask(taskToCheckId: string) {

    const tasksWithoutChecked = tasks.filter(task =>{
      return task.id !== taskToCheckId;
    })

    const foundTask = getTaskById(tasks, taskToCheckId) as TaskType

    foundTask.isChecked = true

    setTasks(tasksWithoutChecked);
    setCheckedTasks([...checkedTasks, foundTask])
  }


  function uncheckTask(taskToUncheckId: string) {

    const checkedTasksWithoutUnchecked = checkedTasks.filter(task =>{
      return task.id != taskToUncheckId;
    })

    const foundTask = getTaskById(checkedTasks, taskToUncheckId) as TaskType;

    foundTask.isChecked = false

    setCheckedTasks(checkedTasksWithoutUnchecked);
    setTasks([...tasks, foundTask])
  }


  function getTaskById(tasks: TaskType[], id: string): TaskType | undefined {
    return tasks.find((task: TaskType) => task.id === id);
  }


  return (
    <div>
      <form onSubmit={(event) => handleCreateNewTask(newTask, false, event)} className={styles.addTask}>

        <textarea
          placeholder="Adicione uma nova tarefa"
          value={newTask}
          onChange={handleNewTaskChange}
        />

        <button 
          type='submit'>
          Criar
          <PlusCircle size={20} fill="#f2f2f2"/>
        </button>

      </form>
      

      <div className={styles.tasks}>

        <div className={styles.info}>

          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <p>{tasks.length + checkedTasks.length}</p>
          </div>

          <div className={styles.doneTasks}>
            <strong>Concluídas</strong>
            <p>{checkedTasks.length} de {tasks.length + checkedTasks.length}</p>
          </div>

        </div>

        <div className={taskList}>
          {noTask ? (<>
              
            <ClipboardText size={56}/>
              
            <div>
              <strong>Você ainda não tem tarefa cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
              

          </>) : (<>

            {tasks.map(task => {
              return <Task id={task.id} content={task.content} isChecked={task.isChecked} onDeleteTask={deleteTask} onCheckTask={checkTask} onUncheckTask={uncheckTask}/>    
            })}

            {checkedTasks.map(task => {
              return <Task id={task.id} content={task.content} isChecked={task.isChecked} onDeleteTask={deleteCheckedTask} onCheckTask={checkTask} onUncheckTask={uncheckTask}/>
            })}

          
          </>)} 
           
        </div>

      </div>

    </div>
  )
}