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
            console.log(`${i + 1}-[x] ${taskList[i].description}`);
        } else {
            console.log(`${i + 1}-[ ] ${taskList[i].description}`);
        }
    }
}

// Primer mode: lectura de tareas necesarias 
function modo1(taskList) {
    rl.question('Introduce una nueva tarea (fin para terminar): ', function(taskDesc) {
        switch(taskDesc) {
            case 'fin':
                console.log('No se agregan más tareas!');
                modo2(taskList);
                break;
            case 'exit':
                rl.close();
                break;
            default:
                addTask(taskList, taskDesc);
                console.log('Tarea añadida');printTaskList(taskList);
                modo1(taskList);
        }
    });    
}


modo1(taskList);

// Segundo mode: Marcar tareas realizadas 

function markTaskDone(taskList, index) {
    if (index >= 0 && index < taskList.length) {
        taskList[index].done = true;
    } else {
        console.log('No existe esa tarea');
    }
}

function checkAllDone (taskList) {
    for (let task of taskList) {
        if (!task.done) return false;
    }
    return true;
}

function modo2(taskList) {
    printTaskList(taskList);
    rl.question('Que tarea has realizado (fin para terminar?): ', function(taskNumber) {
        switch(taskNumber) {
            case 'fin':
                console.log('Adiós!');
            case 'exit':
                rl.close();
                break;
            default:
                markTaskDone(taskList, taskNumber - 1);
                // comprobar si estan todas hechas
                if (checkAllDone(taskList)) {
                    console.log(`¡Felicidades! Terminaste las ${taskList.length} tareas`);
                    printTaskList(taskList);
                    rl.close();
                } else {
                    modo2(taskList);
                }
        }
    });    
}