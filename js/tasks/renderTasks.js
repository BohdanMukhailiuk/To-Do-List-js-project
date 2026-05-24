import { createTaskElement } from './taskElement.js';


const tasksList = document.getElementById('tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

export function renderTasks(users, currentUser) {

    const oldTasks = document.querySelectorAll('.task');
    oldTasks.forEach(task => task.remove());

    if (!currentUser) return;
    users[currentUser].forEach((task, index) => {
        const taskElement = createTaskElement(task, index, users, currentUser,
            () => renderTasks(users, currentUser));
        if (task.completed) {
            completedTasksList.appendChild(taskElement);
        } else {
            tasksList.appendChild(taskElement);
        }
    });
}