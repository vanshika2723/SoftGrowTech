// Select DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load saved todos safely
let todos = [];

try {
    const saved = localStorage.getItem('todos');
    todos = saved ? JSON.parse(saved) : [];
} catch {
    todos = [];
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for each todo
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // ✔ Checkmark icon
    const mark = document.createElement("span");
    mark.textContent = "✔";
    mark.classList.add("checkmark");
    mark.style.display = todo.completed ? "inline" : "none";

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.classList.add("completed");
    }

    // Toggle completed
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
        render(); // UI update fix
    });

    // Edit todo (double click)
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText && newText.trim() !== "") {
            todo.text = newText.trim();
            saveTodos();
            render();
        }
    });

    // Delete todo
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(mark);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render all todos
function render() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        list.appendChild(createTodoNode(todo, index));
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';
    saveTodos();
    render();
}

// Events
addBtn.addEventListener("click", addTodo);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial render
render();