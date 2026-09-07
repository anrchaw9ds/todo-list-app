// Todo List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.sortOrder = 'newest';
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.filter-btn').classList.add('active');
                this.currentFilter = e.target.closest('.filter-btn').dataset.filter;
                this.render();
            });
        });

        // Sort button
        document.getElementById('sortBtn').addEventListener('click', () => this.toggleSort());

        // Clear completed
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCompleted());
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            alert('Please enter a task');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString(),
            dueDate: null
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        input.value = '';
        this.render();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToStorage();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    editTodo(id) {
        this.editingId = id;
        const todo = this.todos.find(t => t.id === id);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">Edit Task</div>
                <input type="text" class="modal-input" id="editInput" value="${this.escapeHtml(todo.text)}">
                <select class="priority-select" id="editPriority">
                    <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low Priority</option>
                    <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
                    <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High Priority</option>
                </select>
                <div class="modal-buttons">
                    <button class="modal-btn modal-cancel" id="cancelBtn">Cancel</button>
                    <button class="modal-btn modal-save" id="saveBtn">Save</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('saveBtn').addEventListener('click', () => {
            const newText = document.getElementById('editInput').value.trim();
            const newPriority = document.getElementById('editPriority').value;
            
            if (newText) {
                todo.text = newText;
                todo.priority = newPriority;
                this.saveToStorage();
                this.render();
            }
            
            modal.remove();
            this.editingId = null;
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            modal.remove();
            this.editingId = null;
        });
        
        document.getElementById('editInput').focus();
    }

    toggleSort() {
        this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
        this.render();
    }

    clearCompleted() {
        if (confirm('Clear all completed tasks?')) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
        }
    }

    getFilteredTodos() {
        let filtered = this.todos;

        if (this.currentFilter === 'active') {
            filtered = filtered.filter(todo => !todo.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        }

        // Sort
        if (this.sortOrder === 'oldest') {
            filtered = filtered.reverse();
        }

        return filtered;
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filtered = this.getFilteredTodos();

        todoList.innerHTML = '';

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        data-id="${todo.id}"
                    >
                    <div class="todo-content">
                        <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span class="todo-date">${todo.createdAt}</span>
                            <span class="todo-priority ${todo.priority}">${todo.priority.toUpperCase()}</span>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-btn" data-id="${todo.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" data-id="${todo.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;

                // Add event listeners
                li.querySelector('.todo-checkbox').addEventListener('change', (e) => {
                    this.toggleTodo(parseInt(e.target.dataset.id));
                });

                li.querySelector('.edit-btn').addEventListener('click', (e) => {
                    this.editTodo(parseInt(e.target.closest('button').dataset.id));
                });

                li.querySelector('.delete-btn').addEventListener('click', (e) => {
                    this.deleteTodo(parseInt(e.target.closest('button').dataset.id));
                });

                todoList.appendChild(li);
            });
        }

        this.updateStats();
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
