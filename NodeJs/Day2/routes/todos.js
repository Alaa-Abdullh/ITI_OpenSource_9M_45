// GET /todos?limit=5&skip=2
app.get('/todos', (req, res) => {
    const { limit = 10, skip = 0 } = req.query;

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todos', status: 'error' });
        }

        let todos = JSON.parse(data);
        todos = todos.slice(Number(skip), Number(skip) + Number(limit));
        const filteredTodos = todos.map(({ id, title, status }) => ({ id, title, status }));

        res.json({
            data: filteredTodos,
            message: 'Todos  successfully',
            status: 'success',
        });
    });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todo', status: 'error' });
        }

        const todos = JSON.parse(data);
        const todo = todos.find(t => t.id === Number(id));

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found', status: 'error' });
        }

        res.json({
            data: { id: todo.id, title: todo.title, status: todo.status },
            message: 'Todo  successfully',
            status: 'success',
        });
    });
});

// POST /todos
app.post('/todos', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required', status: 'error' });
    }

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todos', status: 'error' });
        }

        const todos = JSON.parse(data);
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

        const newTodo = { id: newId, title, status: 'done' };
        todos.push(newTodo);

        fs.writeFile('data.json', JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing todo', status: 'error' });
            }

            res.status(201).json({
                data: newTodo,
                message: 'Todo created successfully',
                status: 'success',
            });
        });
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todos', status: 'error' });
        }

        let todos = JSON.parse(data);
        const todoIndex = todos.findIndex(t => t.id === Number(id));

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found', status: 'error' });
        }

        if (title) todos[todoIndex].title = title;
        if (status) todos[todoIndex].status = status;

        fs.writeFile('data.json', JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating todo', status: 'error' });
            }

            res.json({
                data: todos[todoIndex],
                message: 'Todo updated successfully',
                status: 'success',
            });
        });
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todos', status: 'error' });
        }

        let todos = JSON.parse(data);
        const todoIndex = todos.findIndex(t => t.id === Number(id));

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found', status: 'error' });
        }

        todos = todos.filter(t => t.id !== Number(id));

        fs.writeFile('data.json', JSON.stringify(todos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting todo', status: 'error' });
            }

            res.json({
                message: 'Todo deleted successfully',
                status: 'success',
            });
        });
    });
});