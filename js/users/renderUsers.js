import { saveUsers } from '../storage/storage.js';
import { renderTasks } from '../tasks/renderTasks.js';

const userList = document.getElementById('users-list');

export function renderUsers(users, currentUser, setCurrentUser) {
    userList.innerHTML = '';
    Object.keys(users).forEach((username) => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        userElement.innerHTML = `
            <div class="user_content">
                <span class="user_name">${username}</span>
            </div>
            
            <div class="user_actions">
                <button class="icon_btn edit_user_btn">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="icon_btn delete_user_btn">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        `;
        if (currentUser === username) {
            userElement.classList.add('active');
        }
        // Create user
        const userContent = userElement.querySelector('.user_content');
        userContent.addEventListener('click', () => {
            setCurrentUser(username);
            renderUsers(users, username, setCurrentUser);
            renderTasks(users, username);
        });
        // Edit user
        const editUserBtn = userElement.querySelector('.edit_user_btn');
        editUserBtn.addEventListener('click', (e) => {
            const newUsername = prompt('Enter new username:', username);
            if (!newUsername) return;
            if (users[newUsername]) {
                alert('Username already exists!');
                return;
            }
            users[newUsername] = users[username];
            delete users[username];
            if (currentUser === username) {
                currentUser = newUsername;
                setCurrentUser(newUsername);
            }
            saveUsers(users);
            renderUsers(users, currentUser, setCurrentUser);
            renderTasks(users, currentUser);
        });
        // Delete user
        const deleteUserBtn = userElement.querySelector('.delete_user_btn');
        deleteUserBtn.addEventListener('click', (e) => {
            delete users[username];
            if (currentUser === username) {
                currentUser = null;
                setCurrentUser(null);
            }
            saveUsers(users);
            renderUsers(users, currentUser, setCurrentUser);
            renderTasks(users, currentUser);

        });
        userList.appendChild(userElement);
    });
}
