const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Tarea:  valor booleano y descripción
let taskList = [];

function addTask(taskList ,taskDescription) {
    taskList.push({done: false, description: taskDescription});
}

function printTaskList(taskList) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].done) {
            console.log(`[x] ${taskList[i].description}`);
        } else {
            console.log(`[ ] ${taskList[i].description}`);
        }
    }
}

// Primer mode: lectura de tareas necesarias 
function askForTask(taskList) {
    rl.question('Introduce una nueva tarea (fin para terminar): ', function(taskDesc) {
        switch(taskDesc) {
            case 'fin':
                console.log('No se agregan más tareas!');
                rl.close();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                addTask(taskList, taskDesc);
                console.log('Tarea añadida');printTaskList(taskList);
                askForTask(taskList);
        }
    });    
}

askForTask(taskList);

// Segundo mode: Marcar tareas realizadas 