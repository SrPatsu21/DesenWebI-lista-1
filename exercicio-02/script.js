document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskNameInput = document.getElementById('task-name');
    const addTaskButton = document.getElementById('add-task');
    const taskFilterInput = document.getElementById('task-filter');
    const themeToggleButton = document.getElementById('theme-toggle');

    // Carrega tarefas do localStorage
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (!Object.keys(tasks).length) {
            tasks = gerarTarefasAleatorias(3)
        }
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox" aria-label="Marcar como concluída">
                <div class="help">${task.name}</div>
                <button class="remove-task" aria-label="Remover tarefa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            `;
            li.classList.add('fade-in');
            taskList.appendChild(li);
        });
    }

function gerarTarefasAleatorias(numTarefas) {
    const nomes = [
        "Estudar JavaScript",
        "Fazer compras",
        "Limpar a casa",
        "Ler um livro",
        "Exercitar-se",
        "Cozinhar",
        "Organizar documentos",
        "Assistir a um filme"
    ];

    const tarefas = [];
    for (let i = 0; i < numTarefas; i++) {
        const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
        const completadoAleatorio = Math.random() < 0; // coloque 0.5 para ter 50% de chance

        tarefas.push({
            name: nomeAleatorio,
            completed: completadoAleatorio
        });
    }
    return tarefas;
}

// Salvar tarefas no localStorage
function saveTasks() {

    const tasks = Array.from(document.querySelectorAll('.task-item')).map(item => {
        // Encontre o parágrafo dentro do item
        return {
            name: item.textContent.trim(),
            completed: item.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

    // Adicionar nova tarefa
    function addTask(name) {
        if (name) {
            const li = document.createElement('li');
            li.className = 'task-item fade-in';
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" aria-label="Marcar como concluída">
                ${name}
                <button class="remove-task" aria-label="Remover tarefa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            `;
            taskList.appendChild(li);
            saveTasks();
        }
    }

    // Filtrar tarefas
    function filterTasks(query) {
        document.querySelectorAll('.task-item').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
        });
    }

    // Alternar tema
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Adicionar event listeners
    addTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        if (taskName) {
            addTask(taskName);
            taskNameInput.value = '';
        }
    });

    taskList.addEventListener('change', event => {
        if (event.target.classList.contains('task-checkbox')) {
            const item = event.target.closest('.task-item');
            item.classList.toggle('completed');
            saveTasks();
        }
    });

    taskList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-task')) {
            event.target.closest('.task-item').remove();
            saveTasks();
        }
    });

    taskFilterInput.addEventListener('input', () => {
        filterTasks(taskFilterInput.value);
    });

    themeToggleButton.addEventListener('click', toggleTheme);

    // Carregar dados iniciais e tema
    loadTasks();
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-mode`);
});