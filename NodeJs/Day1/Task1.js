const fs = require('fs');

let [,, command, title, editTitle,status] = process.argv;

switch (command) {
    case "add":
        if (!title) {
            console.log("Please provide a title for the todo.");
            break;
        }
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }

            let todos = JSON.parse(data);
            todos.push({
                title,
                id: (todos.length === 0) ? 1 : todos[todos.length - 1].id + 1,
                status:"todo"
            });

            fs.writeFile("data.json", JSON.stringify(todos), 'utf-8', (err) => {
                if (err) console.log("Error writing file:", err);
                else console.log("Todo added successfully!");
            });
        });
        break;

    case "list":
        let flag = process.argv.findIndex(arg=>arg=="-s" );
        let filterstat=flag!==-1?process.argv[flag+10]:null;
        const validatestatus=["todo","in progress","done"];
        if(filterstat && !validatestatus.includes(filterstat)){
            console.log("invalid status");
            break;
            
        }

        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }
            let todos=JSON.parse(data);
            if (filterstat) {
                todos=todos.filter(todo=>todo.status===filterstat);
            }
            if (todos.length===0) {
                console.log("not todo found")
                
            }
            else{
  
                console.log(JSON.parse(data));
            }
         
        });
        break;

    case "delete":
        if (!title) {
            console.log("Please provide an ID to delete.");
            break;
        }
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }

            let todos = JSON.parse(data);
            let index = todos.findIndex(todo => todo.id == title);

            if (index !== -1) {
                todos.splice(index, 1);
                fs.writeFile("data.json", JSON.stringify(todos), 'utf-8', (err) => {
                    if (err) console.log("Error writing file:", err);
                    else console.log("Todo deleted successfully!");
                });
            } else {
                console.log("Todo not found.");
            }
        });
        break;

    case "edit":
        if (!title || !editTitle) {
            console.log("Please provide an ID and a new title.");
            break;
        }
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }

            let todos = JSON.parse(data);
            let index = todos.findIndex(todo => todo.id == title);

            if (index !== -1) {
                const validatestatus=["todo","done"]
                if(validatestatus.includes(editTitle)){
                    todos[index].status=editTitle;
                    console.log("Todo  status updated successfully!");
                }
                else{
                    todos[index].title = editTitle;
                    console.log("Todo updated successfully!");

                }
               
                fs.writeFile("data.json", JSON.stringify(todos), 'utf-8', (err) => {
                    if (err) console.log("Error writing file:", err);
                });
            } else {
                console.log("Todo not found.");
            }
        });
        break;

    default:
        console.log("Invalid choice :(");
}