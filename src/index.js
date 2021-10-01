const columnUninitiated = document.getElementById("uninitiated");
const columnInitiated = document.getElementById("initiated");
const columnFinished = document.getElementById("finished");
const myAddButton = document.getElementById("addButton");
const myDescriptionAdd = document.getElementById("description");
const myTitle = document.getElementById("title");
const myTaskDescription = document.getElementById("taskDescription");
const indexAddItem = document.getElementById("indexAddTask");
const myTaskTitle = document.getElementById("taskTitle");
const myTaskDueDateDetails = document.getElementById("dueDateDetails");
const myTaskPriorityDetails = document.getElementById("priorityDetails");
const myTaskDueDateAdd = document.getElementById("dueDateAdd");
const myTaskPriorityAdd = document.getElementById("priorityAdd");
const auxItemToNextColumn = document.getElementById("nextButton");
const auxDeleteItem = document.getElementById("deleteButton");
const auxItemSaveEdit = document.getElementById("saveButton");
let itemsCreatedObj = []; // Stores the Todo's objects, as in a "database".

class TaskTodo {
  constructor(status, title, description, dueDate, priority) {
    this.status = status;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.getItem(i)) {
    let objFromLocalStorage = JSON.parse(localStorage.getItem(i));
    createItemTodoFromLocalStorage(i, objFromLocalStorage);
    
    if (objFromLocalStorage.status === "started") {
      itemToNextColumn(i);
    } else if (objFromLocalStorage.status === "finished") {
      itemToNextColumn(i);
      itemToNextColumn(i);
    }
  }
}

myAddButton.onclick = () => createItemTodo();

let createItemUniqueId = () => {
  let count = 0;
  while (itemsCreatedObj[count]) {
    ++count
  }

  return count;
}

function changePriorityAdd(element) {
  if (element.innerHTML === "Low") {
    myTaskPriorityAdd.style.backgroundColor = "green";
    myTaskPriorityAdd.innerHTML = element.innerHTML;
    myTaskPriorityAdd.value = element.innerHTML;
  } else if (element.innerHTML === "Medium") {
    myTaskPriorityAdd.style.backgroundColor = "#e6ac00";
    myTaskPriorityAdd.innerHTML = element.innerHTML;
    myTaskPriorityAdd.value = element.innerHTML;
  } else {
    myTaskPriorityAdd.style.backgroundColor = "red";
    myTaskPriorityAdd.innerHTML = element.innerHTML;
    myTaskPriorityAdd.value = element.innerHTML;
  }
}

// Open the "Add Todo" window.
function openAddForm() {
  indexAddTask.style.display = "block";
}

// Close the "Add Todo" window.
function closeAddForm() {
  indexAddTask.style.display = "none";
  myTitle.value = "";
  myDescriptionAdd.value = "";
  myTaskPriorityAdd.innerHTML = "";
  myTaskDueDateAdd.value = "";
  myTaskPriorityAdd.style.backgroundColor = "green";
}

// See details of an already created Todo.
function openItem(id) {
  document.getElementById("myTask").style.display = "block";
  myTaskTitle.innerHTML = itemsCreatedObj[id].title;
  myTaskDescription.value = itemsCreatedObj[id].description;
  auxDeleteItem.setAttribute("onclick", `deleteItem(${id})`);
	auxItemSaveEdit.setAttribute("onclick", `saveItemTodo(${id})`);
  auxItemToNextColumn.setAttribute("onclick", `itemToNextColumn(${id})`);
  myTaskDueDateDetails.value = itemsCreatedObj[id].dueDate;
  myTaskPriorityDetails.innerHTML = itemsCreatedObj[id].priority;

  if (myTaskPriorityDetails.innerHTML === "Low") {
    myTaskPriorityDetails.style.backgroundColor = "green";
  } else if (myTaskPriorityDetails.innerHTML === "Medium") {
    myTaskPriorityDetails.style.backgroundColor = "#e6ac00";
  } else if (myTaskPriorityDetails.innerHTML === "High") {
    myTaskPriorityDetails.style.backgroundColor = "red";
  } else {
    myTaskPriorityDetails.innerHTML = "Not defined";
    myTaskPriorityDetails.style.backgroundColor = "grey"
  }

  if (itemsCreatedObj[id].status === "finished") {
    auxItemToNextColumn.style.backgroundColor = "grey";
  } else auxItemToNextColumn.style.backgroundColor = "blue";
}

// Removes Todo from the layout and database.
function deleteItem(id) {
  document.getElementById("myTask").style.display = "none";
  myTaskTitle.innerHTML = "";
  myTaskDescription.value = "";
  itemsCreatedObj[id] = undefined;
  let itemRemoval = document.getElementById(`${id}`);
  itemRemoval.remove();
  localStorage.removeItem(id);
}

// Close the "Todo details" window.
function closeItem() {
  document.getElementById("myTask").style.display = "none";
}

function saveItemTodo(id) {
  itemsCreatedObj[id].description = myTaskDescription.value;
	localStorage.setItem(id, JSON.stringify(itemsCreatedObj[id]));
	myTaskDescription.value = "";
	closeItem();
}

// Moves the Todo trough the stages of completion.
function itemToNextColumn(id) {
  let itemMove = document.getElementById(`${id}`);
  if (itemsCreatedObj[id].status === "unstarted") {
    itemsCreatedObj[id].status = "started";
    columnInitiated.append(itemMove);
		localStorage.setItem(id, JSON.stringify(itemsCreatedObj[id]));
  } else {
    itemsCreatedObj[id].status = "finished";
    columnFinished.append(itemMove);
    auxItemToNextColumn.style.backgroundColor = "grey";
    localStorage.setItem(id, JSON.stringify(itemsCreatedObj[id]));
  }
}

// Creates the Todo with the information contained on the "Add" window.
function createItemTodo() {
  const newItem = document.createElement('div');
  if (myTitle.value === "") {
    document.getElementById("addTaskErrorMessageTitle").innerHTML = "*Title cannot be empty!*";
  } else {
    newItem.classList.add('items');
    newItem.setAttribute('id', createItemUniqueId())
    itemsCreatedObj[newItem.id] = new TaskTodo("unstarted", myTitle.value, myDescriptionAdd.value, myTaskDueDateAdd.value, myTaskPriorityAdd.value);
    newItem.innerHTML = itemsCreatedObj[newItem.id].title;
    columnUninitiated.append(newItem);
    newItem.setAttribute("onclick", `openItem(${newItem.id})`);

    localStorage.setItem(newItem.id, JSON.stringify(itemsCreatedObj[newItem.id]));

    closeAddForm();
  }
}

function createItemTodoFromLocalStorage(id, objFromLocalStorage) {
  const newItem = document.createElement('div');
  newItem.classList.add('items');
  newItem.setAttribute('id', id)
  itemsCreatedObj[newItem.id] = new TaskTodo(objFromLocalStorage.status, objFromLocalStorage.title, objFromLocalStorage.description, objFromLocalStorage.dueDate, objFromLocalStorage.priority);
  newItem.innerHTML = itemsCreatedObj[newItem.id].title;
  columnUninitiated.append(newItem);
  newItem.setAttribute("onclick", `openItem(${newItem.id})`);
}
