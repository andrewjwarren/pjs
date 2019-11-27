
var todoList = {
  todos: [],
  addTodo: function(todo) {
    this.todos.push({
      todoText: todo,
      completed: false,
    });
  },
  changeTodo: function(pos, todo) {
    this.todos[pos].todoText = todo;
  },
  removeTodo: function(pos) {
    this.todos.splice(pos, 1);
  },
  toggleCompleted: function(pos) {
    let todo = this.todos[pos];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let didChange = false;
    for (let todo of this.todos) {
      if (!todo.completed) {
        todo.completed = true;
        didChange = true;
      }
    }
    if ( didChange === false) {
      for (let todo of this.todos) {
        todo.completed = false;
      }
    }
  }
};

var views = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul')
    todosUl.innerHTML = ''
    let i = 0
    for (let todo of todoList.todos) {
      let todoLi = document.createElement('li');
      let completed = ' ';
      if (todo.completed) {
        completed = 'X';
      }
      todoLi.textContent = `(${completed}) ${todo.todoText}`;
      todoLi.id = i;
      let deleteButton = views.createDeleteButton();
      let toggleButton = views.createToggleButton();
      todoLi.appendChild(toggleButton);
      todoLi.appendChild(deleteButton);
      todosUl.appendChild(todoLi);
      i++
    }
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createToggleButton: function() {
    let toggleButton = document.createElement('button');
    toggleButton.textContent = "Completed";
    toggleButton.className = "toggleCompleteButton";
    return toggleButton
  },
  setUpEventListeners: function() {
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      let elementClicked = event.target;
      switch (elementClicked.className) {
        case "deleteButton":
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
          break;
        case "toggleCompleteButton":
          handlers.toggleTodo(parseInt(elementClicked.parentNode.id));
          break;
      }
    })
  }
}

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    views.displayTodos();
  },
  addTodo: function() {
    let addTodoText = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoText.value);
    addTodoText.value = '';
    views.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPos = document.getElementById('changeTodoPosition');
    let changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodo(changeTodoPos.valueAsNumber, changeTodoText.value);
    for (x of [changeTodoPos, changeTodoText]) {
      x.value = '';
    }
    views.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.removeTodo(position);
    views.displayTodos();
  },
  toggleTodo: function(position) {
    todoList.toggleCompleted(position);
    views.displayTodos();
  }
}

for (i=1; i<5; i++) {
  todoList.addTodo(`item ${i}`);
}

views.setUpEventListeners()
views.displayTodos()

