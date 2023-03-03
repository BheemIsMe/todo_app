import {create} from 'zustand'


type Todo = {
    id: number,
    title: string,
    description: string,
    status: number
}

type Store = {
    todos: {[id: number]: Todo},
    addTodo: Function,
    deleteTodo: Function,
    updateTodoStatus: Function,
    updateTodo: Function
}
const useStore = create<Store>((set) => ({
    todos: {
        1: {
            "id": 1,
            "title": "Math",
            "description": "calculus is left",
            "status": 1
        },
        2: {
            "id": 2,
            "title": "Physics",
            "description": "mechanics is left",
            "status": 2
        },
        3: {
            "id": 3,
            "title": "CS",
            "description": "DSA is left",
            "status": 3
        }

    },
    addTodo: (newTodo: Todo) => set((state) => {

        return {
            todos: {
                ...state.todos,[newTodo.id]: newTodo
            }
        }
    }),
    deleteTodo: (todo: Todo) => set((state) => {
        delete state.todos[todo.id]
        return {todos: state.todos}
    }),
    updateTodoStatus: (todo: Todo,status: number) => set((state) => {
        state.todos[todo.id].status = status
        return {
            todos: {...state.todos}
        }
    }),
    updateTodo: (todo: Todo,title: string|undefined, description: string|undefined) => set((state) => {
        if (title) {
            state.todos[todo.id].title=todo.title
        }

        if (description) {
            state.todos[todo.id].description=todo.description
        }
        return {
            todos: state.todos
        }
    }),


}))

export type {Todo}
export default useStore