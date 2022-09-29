import { defineStore } from "pinia";
import { v4 as uuid} from "uuid";


// Define some interfaces and types
export interface Todo {
    id: string;
    title: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface TodoAdd {
    title: string
}
export interface TodoUpdate {
    title?: string;
    done?: boolean;
}
export interface TodoState {
    items: Todo[] | undefined[];
}
const state = (): TodoState => ({
    items: []
});

// Defining some Getters
const getters = {
    getById: (state: TodoState) =>  (id: string) => {
        return state.items.find((item: Todo) => item.id === id);
    },
    getOrderedTodos: (state: TodoState) => {
        // Here we have to destructure the array to a new array so that we don't mutate the state of the items
        return [...state.items].sort(
            (a: Todo, b: Todo) => 
                a.createdAt.getTime() - b.createdAt.getTime()
            
        )
    }
}

// Defining some actions
const actions = {
    add(partialTodo: TodoAdd) {
        const todo: Todo = {
            id: uuid(),
            ...partialTodo,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.items.push(todo);
    },
    remove(id: string) {
        this.items = this.items.filter(todo => todo.id !== id);
    },

    // During the unit testing I could not reach the code inside the array map. so I refactored it below but kept the original so that I can ask someone how I should go about reaching code like this in a unit test
    /* update(id: string, update: TodoUpdate) {
        this.items = this.items.map((item) => 
            item.id === id ? {...item, ...update, updatedAt: new Date()}:item
        );
    } */

    update(id: string, update: TodoUpdate) {
        const index = this.items.findIndex(item => item.id === id);
        this.items[index] = {
            ...this.items[index],
            ...update,
            updatedAt: new Date()
        }
    }
};

export const useTodoStore = defineStore("todoStore", {
    state,
    getters,
    actions
});