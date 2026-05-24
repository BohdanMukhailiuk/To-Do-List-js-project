import { loadUsers, saveUsers } from './storage/storage.js';
import { createTaskElement } from './tasks/taskElement.js';
import { renderUsers } from './users/renderUsers.js';
import { renderTasks } from './tasks/renderTasks.js';

const userInput = document.getElementById('user-input');
const taskInput = document.getElementById('task-input');

let users = loadUsers();
let currentUser = null;

function setCurrentUser(username) {
    currentUser = username;
}

// Add user
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const username = userInput.value.trim();
        if (username === '') return;
        if (!users[username]) {
            users[username] = [];
        }
        setCurrentUser(username);
        saveUsers(users);
        renderUsers(users, currentUser, setCurrentUser);
        userInput.value = '';
    }
});

// Add Task
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (!currentUser) {
            alert('Please create a user first!');
            return;
        }
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        users[currentUser].push({
            text: taskText,
            completed: false
        });
        saveUsers(users);
        renderTasks(users, currentUser);
        taskInput.value = '';
    }
});


renderUsers(users, currentUser, setCurrentUser);