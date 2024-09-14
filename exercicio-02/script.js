document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskFilter = document.getElementById('task-filter');
    const themeToggle = document.getElementById('theme-toggle');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) {
                span.classList.add('completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function filterTasks() {
        const query = taskFilter.value.toLowerCase();
        document.querySelectorAll('#task-list li').forEach(li => {
            const text = li.querySelector('span').textContent.toLowerCase();
            li.style.display = text.includes(query) ? '' : 'none';
        });
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    themeToggle.addEventListener('click', toggleTheme);
    taskFilter.addEventListener('input', filterTasks);

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            text: taskInput.value,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    renderTasks();
});
