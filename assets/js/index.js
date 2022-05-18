const taskInput = document.querySelector('#add-new-task');
const addTaskForm = document.querySelector('.add-task-form');

var tasks = [];



addTaskForm.addEventListener('submit', addNewTask);



function addNewTask(e) {
    e.preventDefault();
    const task = taskInput.value;
    if(!task) {
        alert('please add a task');
    } else {
        tasks.push(task);
        e.target.reset();
        displayTasks();
    }
    console.log(tasks);
}

function displayTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskEl = document.createElement('label');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        
        const taskContent = document.createElement('input');
        taskContent.classList.add('task-content');
        taskContent.type = 'text';
        taskContent.value = task;
        taskContent.setAttribute('readonly', true);
        
        const deleteBtn = document.createElement('img');
        deleteBtn.src = './assets/images/icon-cross.svg';
        deleteBtn.classList.add('delete-btn');

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        
        taskList.appendChild(taskEl);
        taskEl.appendChild(checkBox);
        taskEl.appendChild(taskContent);
        taskEl.appendChild(deleteBtn);
        taskEl.appendChild(editBtn);
        
        deleteBtn.addEventListener('click', e => {
            e.preventDefault();
            tasks = tasks.filter(t => t != task);
            displayTasks();
        })

        editBtn.addEventListener('click', e => {
            e.preventDefault();
            const input = taskEl.querySelector('input[type=text]');
            const index = tasks.indexOf(task);
            editBtn.innerHTML = 'Done';
            taskContent.removeAttribute('readonly');
            taskContent.focus();
            taskContent.addEventListener('blur', e => {
                if(index !== -1) {
                    tasks[index] = input.value;
                }
                console.log(tasks)
                displayTasks();
            })
            console.log(input.value)
        })

        checkBox.addEventListener('click', e => {
            if(e.target.checked == true) {
                taskContent.classList.add('done');
            } else {
                taskContent.classList.remove('done');
            }
        })
    })
}



