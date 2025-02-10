const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");
const alertDiv = document.getElementById("alertDiv");

loadTodos();

function addTodo() {
  const inputValue = todoInput.value;

  if (!inputValue) {
    alertDiv.textContent = "Please enter a value!";
    alertDiv.style.display = "block";
  } else {
    alertDiv.style.display = "none";
    createTodoElement(inputValue, false);
    todoInput.value = "";
    saveTodosInLocalStorage();
  }
}

function createTodoElement(todo, isCompleted) {
  const newTodo = document.createElement("li");

  const todoText = document.createElement("span");
  todoText.textContent = todo;
  if (isCompleted) {
    todoText.style.textDecoration = "line-through";
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.classList.add("complete-btn");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");

  newTodo.appendChild(todoText);
  newTodo.appendChild(completeButton);
  newTodo.appendChild(deleteButton);
  newTodo.appendChild(editButton);
  todoList.appendChild(newTodo);

  deleteButton.addEventListener("click", () => {
    todoList.removeChild(newTodo);
    saveTodosInLocalStorage();
  });

  completeButton.addEventListener("click", () => {
    todoText.style.textDecoration =
      todoText.style.textDecoration === "line-through"
        ? "none"
        : "line-through";
    saveTodosInLocalStorage();
  });

  editButton.addEventListener("click", () => {
    if (editButton.textContent === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todoText.textContent;
      editInput.classList.add("edit-input");
      completeButton.disabled = true;
      deleteButton.disabled = true;

      newTodo.replaceChild(editInput, todoText);
      editButton.textContent = "Save";
    } else {
      const newText = newTodo.querySelector("input").value.trim();
      if (!newText) {
        alertDiv.textContent = "Please enter a value!";
        alertDiv.style.display = "block";
      } else {
        alertDiv.style.display = "none";
        todoText.textContent = newText;
        newTodo.replaceChild(todoText, newTodo.querySelector("input"));
        editButton.textContent = "Edit";
        completeButton.disabled = false;
        deleteButton.disabled = false;
        saveTodosInLocalStorage();
      }
    }
  });

  saveTodosInLocalStorage();
}

function saveTodosInLocalStorage() {
  let todos = [];
  todoList.querySelectorAll("li").forEach((todo) => {
    const text = todo.querySelector("span").textContent;
    const isCompleted =
      todo.querySelector("span").style.textDecoration === "line-through";
    todos.push({ text, isCompleted });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos") || []);
  todos.forEach(({ text, isCompleted }) =>
    createTodoElement(text, isCompleted)
  );
}

addTodoButton.addEventListener("click", addTodo);
