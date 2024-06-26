import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  currentTodo: Todo | null
  finishEditTodo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

 
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        ></input>
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
