async function get() {
    return fetch("/api/todos").then(async (respostaServidor) => {
        const todosString = await respostaServidor.text();
        const todosFromServer = JSON.parse(todosString).todos;
        return todosFromServer;
    });
}

export const todoController = {
    get,
}
