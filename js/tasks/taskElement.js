// create task
import { saveUsers } from '../storage/storage.js';

export function createTaskElement(task, index, users, currentUser, renderTasks) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <div class="task_info">
            <input type="checkbox" class="task_check"
                ${task.completed ? 'checked' : ''}>
            <div class="task_text">
                ${task.text}
            </div>
            <input type="text" class="task_edit_input hidden">
        </div>
        <div class="task_actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;
    // Complete task
    const checkbox = taskElement.querySelector('.task_check');
    const taskText = taskElement.querySelector('.task_text');

    if (task.completed) {
        taskText.classList.add('completed');
    }
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveUsers(users);
        renderTasks();
    });

    // Edit task
    const editBtn = taskElement.querySelector('.edit');
    const taskEditInput = taskElement.querySelector('.task_edit_input');
    let isEditing = false;

    editBtn.addEventListener('click', () => {
        if (!isEditing) {
            isEditing = true;
            taskEditInput.classList.remove('hidden');
            taskText.classList.add('hidden');
            taskEditInput.value = task.text;
            taskEditInput.focus();
            editBtn.textContent = 'Save';
        } else {
            const newText = taskEditInput.value.trim();
            if (newText !== '') {
                task.text = newText;
                saveUsers(users);
                renderTasks();
            }
        }
    });

    taskEditInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const newText = taskEditInput.value.trim();
            if (newText !== '') {
                task.text = newText;
                saveUsers(users);
                renderTasks();
            }
        }
    });

    // Delete task
    const deleteBtn = taskElement.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
        users[currentUser].splice(index, 1);
        saveUsers(users);
        renderTasks();
    });

    return taskElement;
}
