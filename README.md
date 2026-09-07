# Todo List App

A modern, feature-rich to-do list application with local storage functionality. Built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features**
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Persistent storage using browser LocalStorage
- ✅ Filter tasks (All, Active, Completed)
- ✅ Sort tasks by date (newest/oldest)
- ✅ Clear all completed tasks

🎨 **UI/UX**
- Modern dark theme with gradient design
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Real-time statistics (Total, Active, Completed)
- Priority levels for tasks (Low, Medium, High)
- Intuitive modal for editing tasks
- Empty state message

🚀 **Technical**
- No dependencies - vanilla JavaScript
- Object-oriented design with TodoApp class
- LocalStorage API for data persistence
- Font Awesome icons
- Cross-browser compatible

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anrchaw9ds/todo-list-app.git
cd todo-list-app
```

2. Open `index.html` in your web browser:
   - Simply double-click `index.html`, or
   - Use a local server: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

## Usage

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the + button
3. Your task is automatically saved

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the Edit button to modify text or priority
- **Delete**: Click the Delete button to remove a task

### Filtering & Sorting
- **Filter**: Use the All/Active/Completed buttons
- **Sort**: Click the sort icon to toggle between newest/oldest
- **Clear**: Remove all completed tasks with the trash icon

## Project Structure

```
todo-list-app/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # Application logic
└── README.md       # Documentation
```

## Data Storage

Tasks are stored in the browser's LocalStorage, which means:
- Data persists between browser sessions
- No server required
- Approximately 5-10MB storage limit per domain
- Data is stored locally on your device

### LocalStorage Structure
```javascript
{
  id: timestamp,
  text: "Task description",
  completed: boolean,
  priority: "low|medium|high",
  createdAt: "date string",
  dueDate: null|"date string"
}
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Partial support (no flexbox)

## Customization

### Change Theme Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --danger-color: #ef4444;
    /* ... more variables */
}
```

### Add More Priority Levels
Modify the `editTodo()` method in `script.js` and add corresponding CSS in `styles.css`.

## Future Enhancements

- 📅 Due date functionality
- 🏷️ Task categories/tags
- 🔔 Browser notifications
- 📊 Progress visualization
- 🌙 Dark/Light theme toggle
- 📱 PWA support
- ☁️ Cloud sync option
- 🎨 Custom themes

## Performance

- Lightweight: ~50KB total (uncompressed)
- No external dependencies
- Fast load times
- Optimized rendering

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues, please open an issue on GitHub.

---

**Built with ❤️ by the Development Team**
