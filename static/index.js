const response = await fetch('/api/todos');
const data = await response.json();

console.log(data);

///////////////////////////////////////////////////////

const newTodo = document.getElementById('newTodo');
const deadline = document.getElementById('deadline');
const createButton = document.getElementById('createButton');
const isChecked = document.getElementsByClassName("checkbox");

async function createNewTodo() {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ todo: newTodo.value, deadline: deadline.value, done: false })
  });

  newTodo.value = '';
  deadline.value = '';
}

let todoDiv = document.getElementById("todoDiv");
let todoChild = '';
let isDone = '';

data.forEach(todos => {
 
  isDone = todos.done === 'true' ? "checked" : '';

  todoChild = `<div style="width: 800px; display: flex; padding: 10px;">`;
  todoChild += `<div ><input id="${todos.id}" class="checkbox" type="checkbox" ${isDone}/></div>`;
  todoChild +=  `<div style="flex-grow: 1">${todos.todo}</div>`;
  todoChild += `<div>${todos.deadline}</div>`;
  todoChild += `</div>`;
  todoChild += `<hr />`;

  todoDiv.innerHTML += todoChild;
})

async function toggleCheck(e) {

  console.log('checked', e.target.checked)
  const elementId = e.target.id;
  const isChecked = e.target.checked === true ? "true" : "false" ;

  const response = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id: elementId, done: isChecked })
  });

  newTodo.value = '';
  deadline.value = '';
}
for( let item of isChecked){
  item.onclick = toggleCheck;
}

console.log(isChecked)
createButton.onclick = createNewTodo;