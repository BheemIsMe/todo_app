
import { useState } from "react"
import useStore, { Todo } from "./store"

export default function App() {
  const [todos, addTodo] = useStore(state => [state.todos, state.addTodo])

  
  const TodoSection = Object.values(todos).filter((todo: Todo) => todo.status == 1).map((todo: Todo, index: number) => {
    return (
      <div><TodoItem key={index} todo={todo} /></div>
    )
  })

  const Inprogress = Object.values(todos).filter((todo: Todo) => todo.status == 2).map((todo: Todo, index: number) => {
    return (
      <div><TodoItem key={index} todo={todo} /></div>
    )
  })

  const Done = Object.values(todos).filter((todo: Todo) => todo.status == 3).map((todo: Todo, index: number) => {
    return (
      <div><TodoItem key={index} todo={todo} /></div>
    )
  })

  return (
    <div className="border-2 flex flex-col">
      <div className="border-2 grid grid-cols-3">
        <section className="border-2">
          <h3>Todo</h3>
          <div>
            {...TodoSection}
          </div>
        </section>
        <section className="border-2">
          <h3>InProgress</h3>
          <div>
            {...Inprogress}
          </div>
        </section>
        <section className="border-2">
          <h3>Done</h3>
          <div>
            {...Done}
          </div>
        </section>
      </div>
      <div>
        <button className="border-2 hover:text-white hover:bg-blue-400" onClick={() => {

          addTodo({
            id: Object.keys(todos).length + 1,
            title: "ENTER TITLE",
            description: "enter description",
            status: 1
          })
        }}>Add Todo</button>
      </div>
    </div>
  )
}

function TodoItem(props: { todo: Todo }) {
  const [todos, updateTodoStatus, deleteTodo,updateTodo] = useStore(state => [state.todos, state.updateTodoStatus,state.deleteTodo,state.updateTodo])

  return (
    <div className="px-2 border-2 flex flex-col ">

      <input type="text" className="font-sembold uppercase cursor-text" name="title" value={todos[props.todo.id].title} disabled={false} 
      
      onChange={(e) => {
        updateTodo(todos[props.todo.id], e.target.value,undefined)
      }}

       />

      <input className="py-2 text-clip cursor-text" disabled={false} type="text" name="description" value={
        todos[props.todo.id].description
      } id="" 
      onChange={(e) => {
        updateTodo(todos[props.todo.id],undefined, e.target.value)
      }}
      />
      <div className="flex flex-row space-x-4 py-2">
        {props.todo.status > 1 ? <button className="border-2 px-2 hover:bg-blue-400 hover:text-white " onClick={() => {
          updateTodoStatus(props.todo, props.todo.status - 1)
        }}>l</button> : ""}
        <button className="border-2 px-2 hover:bg-blue-400 hover:text-white" onClick={() => {
          deleteTodo(props.todo)
        }}>d</button>
        {
          props.todo.status < 3 ? <button className="border-2 px-2 hover:bg-blue-400 hover:text-white" onClick={() => {
            updateTodoStatus(props.todo, props.todo.status+1)
          }}>r</button> : ""
        }
        </div>
    </div>
  )
}