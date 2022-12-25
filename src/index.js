const form = document.querySelector('.form');
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    addNewTaskToServer()
    form.reset()
})
const todoTableBody = document.querySelector(".todo__table__body");
let allTodosTasks = [];

///se hace una peticion HTML
const getTodoTasks = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  //console.log(data);
  return data;
};
getTodoTasks().then((data) => setTasksToArray(data));

//pasa los task a el array[]
const setTasksToArray = (task) => {
  allTodosTasks = task;
  setTasks(allTodosTasks);
  //console.log(allTodosTasks);
};
//se usa el forEach para buscar dentro del array del json y se usa la funcion render para pasarle la data
const setTasks = (tasks) => {
  tasks.forEach((task, index) => {
    renderTodos(task, index);
  });
};
//se crea una funcion render que crea las tareas
const renderTodos = (task, index) => {
  const tr = document.createElement("tr");

  const tdID = document.createElement("td");
  tdID.textContent = task.id;

  const tdTitle = document.createElement("td");
  tdTitle.textContent = task.title;

  const tdDescription = document.createElement("td");
  tdDescription.textContent = task.body;

  const tdStatus = document.createElement("td");
  tdStatus.textContent = "pending";

  const tdEditAndDelete = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', ()=>{
    removeFromApi(index)
  })

  tdEditAndDelete.append(editButton, deleteButton);
  tr.append(tdID, tdTitle, tdDescription, tdStatus, tdEditAndDelete);
  todoTableBody.append(tr);
  return tr;
};

const addNewTask = (newtask) => {
  allTodosTasks.push(newtask);
  renderTodos(allTodosTasks);
};

const addNewTaskToServer = async (task) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  addNewTask(data)
};

const removeCurrentTask = (index) =>{
  /* const removeTask = allTodosTasks.filter((value) =>{
    console.log('This is the value' + JSON.stringify(value.id))
    const Trueorfalse = value.id !== id
    return Trueorfalse;
  }) */
  const removeTask = allTodosTasks.splice(index, 1)
  //console.log(removeTask)
  setTasks(removeTask);
}

const removeFromApi = async (id) => {
   await fetch(`https://jsonplaceholder.typicode.com/posts${id}`, {
    method: "DELETE",
  });
  removeCurrentTask(id)
}


/* let newArray = ['hola', 'adios', 'buenas']
let results = newArray.splice(2, 1)
console.log(results)
console.log(newArray)
 */