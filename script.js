const taskForm = document.getElementById ('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(text, isCompleted = false) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    if (isCompleted) {
        li.classList.add('completed');
    }

    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });
    
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const span = li.querySelector('span');
        tasks.push({
            text: span.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}
