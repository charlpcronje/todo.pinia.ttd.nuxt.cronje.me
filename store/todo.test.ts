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
