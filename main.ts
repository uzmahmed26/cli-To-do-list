#! /usr/bin/env node

import inquirer from "inquirer"

interface TodoItem{
    task: string;
    completed: boolean;
}

const todolist: TodoItem[] = [];

async function mainMenu() {
    const{ action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Add Task", "View List", "Mark as Completed", "Delete Task", "Exit"]

    });
    switch (action){
        case "Add Task":
            await addTask();
            break;
            case "View List":
                viewList();
                break;
                case "Mark as Completed":
                    await markCompleted();
                    break;
                    case "Delete Task":
                        await deleteTask();
                        break;
                        case "Exit":
                            console.log("Goodbye!");
                            return;
    }
    mainMenu();
}
  

    let addTask = async () => {
        let { task } = await inquirer.prompt({
            type: "input",
            name: "task",
            message: "Enter the task",
        });
        todolist.push({ task,completed: false});
        console.log("Task Added Successfully");
        
    }

    function viewList() {
        console.log("***** To Do List****");
        todolist.forEach((item, index) => {
console.log(`${index + 1}.[${item.completed ? "x" : ""}] ${item.task}`);

        });
        console.log("******************"); 
        
    }

let markCompleted = async() => {
    let { index } = await inquirer.prompt({
        type: "list",
        name:"index",
        message: "Which task do you want to mark as completed?",
     choices: todolist.map((item, index) => ({name:item.task, value:index}))
    });
    if (index < 0 || index > todolist.length){
        console.log("invalid task number.please try again.");
        return;
        
    }
    todolist[index].completed = true;
    console.log("task mark as completed");
}

     async function deleteTask() {
        let {index} = await inquirer.prompt({
            type: "list",
            name: "index",
            message: "Select the task to delete",
            choices: todolist.map((item,index) => ({name: item.task, value: index}))
        });
       if (index < 0 || index >= todolist.length){
        console.log("Invalid task number. Please try again.");
return;

       }
        todolist.splice(index, 1);
        console.log("Task deleted successfully");
        
    }

mainMenu();