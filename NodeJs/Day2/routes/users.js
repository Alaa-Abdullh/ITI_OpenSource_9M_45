
app.get('/users', (req, res) => {
    // const { id } = req.params;

    // fs.readFile('data.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         return res.status(500).json({ message: 'Error reading todo', status: 'error' });
    //     }

    //     const todos = JSON.parse(data);
    //     const todo = todos.find(t => t.id === Number(id));

    //     if (!todo) {
    //         return res.status(404).json({ message: 'Todo not found', status: 'error' });
    //     }

    //     res.json({
    //         data: { id: todo.id, title: todo.title, status: todo.status },
    //         message: 'Todo  successfully',
    //         status: 'success',
    //     });
    // });
});