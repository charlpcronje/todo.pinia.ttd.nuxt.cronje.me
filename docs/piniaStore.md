# Pinia Store

## Create new store

```sh
mkdir /store
touch todo.ts
code todo.ts
```

> For a simple todo app I added the following code, but not yet tested so might have some bugs still, the point of Test Driven Development is not to get everything 100% correct from the beginning but to sort of mockup the code ready for testing

## The Store Code for Todo (Before unit testing)

```ts
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
    title: string;
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
        state.items.sort(
            (a: Todo, b: Todo) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
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
    update(id: string) {
        this.items = this.items.map((item) => 
            item.id === id ? {...item, ...update, updatedAt: new Date()}: item
        );
    }
};

export const useTodoStore = defineStore("todoStore", {
    state,
    getters,
    actions
});
```

## The Store Code for Todo (After unit testing)

```ts
// ./store/todo.ts

import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { useTodoStore } from "./todo";

beforeAll(() => {
    // Set an instance of Pinia
    setActivePinia(createPinia());
}); 

// Tests for todo store
describe('useTodoStore',() => {
    // Setting store as a type of whatever useTodoStore returns
    let store: ReturnType<typeof useTodoStore>;

    // Before every test I want to create a new instance of the store
    beforeEach(() => {
        store = useTodoStore();
    });
    // Reset store after each test
    afterEach(() => {
        store.$reset();
    });
    // Test if the store is created and empty
    test("initializes with empty items", () => {
        expect(store.items).toStrictEqual([]);
    });
    // Test to create a new toto and then check if it is created
    test("Creates a todo",() => {
        store.add({ title: "Test my code!" });
        expect(store.items[0]).toBeDefined();
        expect(store.items[0].title).toBe("Test my code!");
    });

    test("Get item by id",() => {
        store.add({title: "Test title for get item by id"});
        const item = store.items[0];
        const todo = store.getById(item.id);
        expect(todo).toStrictEqual(item);
    });

    test("Get ordered todos without mutating state", () => {
        const items = [
            {
                createdAt: new Date(2021,2,14)
            },
            {
                createdAt: new Date(2019,2,14)
            },
            {
                createdAt: new Date(2020,2,14)
            }
        ];

        // @ts-ignore
        store.items = items;
        
        expect(store.getOrderedTodos[0].createdAt.getFullYear()).toBe(2019);
        expect(store.getOrderedTodos[1].createdAt.getFullYear()).toBe(2020);
        expect(store.getOrderedTodos[2].createdAt.getFullYear()).toBe(2021);
        expect(store.items[0].createdAt.getFullYear()).toBe(2021);
    });

    test("Removes an item",() => {
        store.add({title: "New test to be removed"});
        const todo = store.items[0];
        store.remove(todo.id);
        expect(store.items).toStrictEqual([]);
    });

    test("Update a todo 'done'",() => {
        store.add({title: "New test to be updated"});
        
        const todo = store.items[0];
        store.update(todo.id,{done: true});
        
        const updated = store.items[0];
        expect(updated.done).toBe(true);
    });

    test("Update a todo title",() => {
        store.add({title: "New test to be updated"});
        
        const todo = store.items[0];
        store.update(todo.id,{title: "And now the title is updated"});
        
        const updated = store.items[0];
        expect(updated.title).toBe("And now the title is updated");
    });
});


// test to test if the test works
describe("runs",() => {
    test("it works",() => {
        expect(true).toBe(true);
    })
});
```

## Test Results

Running yarn test with this code results in the following output