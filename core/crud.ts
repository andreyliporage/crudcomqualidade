import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
    id: string;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    };

    const todos: Array<Todo> = [...read(), todo];

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    );

    return todo;
}

export function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (!db.todos) {
        return [];
    }

    return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
    let updatedTodo;
    const todos = read();

    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    );

    if (!updatedTodo) {
        throw new Error("Please, provide another ID!");
    }

    return updatedTodo;
}

function deleteById(id: string) {
    const todos = read();

    const todosWithoutOne = todos.filter((todo) => {
        if (id === todo.id) {
            return false;
        }

        return true;
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos: todosWithoutOne,
            },
            null,
            2
        )
    );
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
CLEAR_DB();
create("Primeira TODO");
create("Segunda TODO");
console.log(read());
