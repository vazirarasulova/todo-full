const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".todo__list");

const count = document.querySelector(".todo__count")
const allBtn = document.querySelector(".todo__all")
const completeBtn = document.querySelector(".todo__complated")
const uncompleteBtn = document.querySelector(".todo__uncomplated")

const all = document.querySelector(".todo__count-all")
const completed = document.querySelector(".todo__count-complated")
const uncompleted = document.querySelector(".todo__count-uncomplated")

const todos = [];

elList.addEventListener("click", evt => {

  if (evt.target.matches(".delete-item")) {
    const btnId = evt.target.dataset.todoId;
    const findIndexArr = todos.findIndex(todo => todo.Id === btnId);

    todos.splice(findIndexArr, 1);
    renderTodos(todos, elList);

  } else if (evt.target.matches(".todo-checked")) {
    const checkId = Number(evt.target.dataset.todoId);

    const findTodo = todos.find(todo => todo.id === checkId);
    findTodo.isComplate = !findTodo.isComplate;

    renderTodos(todos, elList)
  }
})

function renderTodos(arr, element) {
  element.innerHTML = "";

  const allResult = todos.length;
  const trueFilter = todos.filter(e => e.isComplate === true).length;

  all.textContent = allResult;
  completed.textContent = trueFilter;
  uncompleted.textContent = allResult - trueFilter;

  arr.forEach(todo => {
    const newItem = document.createElement("li");
    const newBtn = document.createElement("button");
    const inputCheck = document.createElement("input");


    newItem.setAttribute("class", "item");
    newItem.setAttribute("style", "text-align: center");
    inputCheck.setAttribute("style", "margin-right: 30px", "margin-left: 30px");
  

    newItem.textContent = todo.title;
    newBtn.textContent = "Delete";
    newBtn.classList.add("delete-item");
    newBtn.classList.add("btn-delete")
    newBtn.dataset.todoId = todo.id;


    inputCheck.type = "checkbox";
    inputCheck.dataset.todoId = todo.id;
    inputCheck.classList.add("todo-checked");
    inputCheck.classList.add("checkbox");

    if (todo.isComplate) {
      inputCheck.checked = true;
      newItem.style.textDecoration = "line-through"
    }

    newItem.appendChild(inputCheck);
    element.appendChild(newItem);
    newItem.appendChild(newBtn);
  });
}

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  const elInputValue = elInput.value.trim();

  const todo = {
    id: todos.length > 0 ? todos[todos.length -1].id +1 : 0,
    title: elInputValue,
    isComplate: false,
  }

  todos.push(todo);

  renderTodos(todos, elList)
  elInput.value = "";
})


count.addEventListener("click", (evt) => {

  if (evt.target.matches(".todo__all")){
    renderTodos(todos, elList)
  }
  if (evt.target.matches(".todo__complete")){
    const filteredCompletes = todos.filter(e => e.isComplate === true);
    renderTodos(filteredCompletes, elList);
  }
  if (evt.target.matches(".todo__uncomplete")){
    const filteredUnCompletes = todos.filter(e => e.isComplate === false);
    renderTodos(filteredUnCompletes, elList);
  }
  
  })