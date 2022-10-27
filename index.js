const todoList = document.querySelector("#todo-list");
const addTask = document.querySelector('input[type="submit"]');
loadTasks();
const state = {
  tasks: [],
};
function renderTasks() {
  todoList.innerHTML = " ";

  state.tasks.forEach((task) => {
    const todoTask = document.createElement("li");
    todoList.appendChild(todoTask);
    todoTask.innerText = task.title;
    if (task.completed === true) {
      todoTask.setAttribute("class", "completed");
    }
  });
}

function loadTasks() {
  const uri = "http://localhost:5000/todos";

  fetch(uri)
    .then((response) => {
      return response.json();
    })
    .then((todos) => {
      state.tasks = todos;
      renderTasks();
    });
}
addTask.addEventListener("click", (event) => {
  event.preventDefault();
  const taskTitle = document.querySelector('input[name="title"]').value;
  const newTask = {
    title: taskTitle,
    completed: false,
  };

  const uri = "http://localhost:5000/todos";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  };
  fetch(uri, options)
    .then((response) => {
      return response.json();
    })
    .then((newTodo) => {
      state.tasks.push(newTodo);
      console.log(state.tasks);
      renderTasks();
    });
});
