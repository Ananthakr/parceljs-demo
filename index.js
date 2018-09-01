document.addEventListener("DOMContentLoaded", () => {
  function inputChangeListener(event) {
    if (event.target.value) {
      let newTodo = event.target.value;
      todos.push(newTodo);
      updateTodoList(newTodo, todoList);
      input.value = "";
    }
  }
  function editInputChangeListener(event) {
    console.log("edit input", event.target.value);
    if (event.target.value) {
      let value = event.target.value;
      todos[parseInt(event.target.data_key)]=event.target.value;
      let parent = event.target.parentNode;
      parent.removeChild(event.target);
      parent.innerHTML = value;
    }
  }
  function todoEdit(value, key, parentNode) {
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = value;
    editInput.data_key = key;
    editInput.onblur = editInputChangeListener;
    editInput.onchange = editInputChangeListener;
    parentNode.innerHTML = "";
    parentNode.appendChild(editInput);
    editInput.focus();
  }
  function updateTodoList(todo, parentNode) {
    if (todo) {
      let todoItem = document.createElement("li");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = todo + "_id_" + todos.length;
      let label = document.createElement("label");
      label.htmlFor = todo + "_id_" + todos.length;
      todoItem.onclick = e => {
        xorClick(e, todo, label);
      };
      label.innerHTML = todo;
      todoItem.appendChild(checkbox);
      todoItem.appendChild(label);
      parentNode.appendChild(todoItem);
    }
  }
  /**
   * To handle click and double click confusions
   * Reference : https://stackoverflow.com/a/11057483
   */
  function xorClick(e, todo, label) {
    // kill any pending single clicks
    if (pendingClick) {
      clearTimeout(pendingClick);
      pendingClick = 0;
    }

    switch (e.detail) {
      case 1:
        pendingClick = setTimeout(function() {
          //console.log("single click action here");
        }, 500); // should match OS multi-click speed
        break;
      case 2:
        //console.log("double click action here");
        todoEdit(todo, todos.length - 1, label);
        break;
      default:
        break;
    }
  }
  let pendingClick = 0;
  let todos = [];
  let app = document.getElementById("app");
  let todoList = document.createElement("ul");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.placeholder = "Enter a todo...";
  input.onchange = inputChangeListener;
  app.appendChild(input);
  app.appendChild(todoList);
});
