const columnUninitiated = document.getElementById("uninitiated");
const columnInitiated = document.getElementById("initiated");
const columnFinished = document.getElementById("finished");
const myAddButton = document.getElementById("addButton");
const myTitle = document.getElementById("title");
const myDescription = document.getElementById("description");
const myTaskTitle = document.getElementById("taskTitle");
const myTaskDescription = document.getElementById("taskDescription");
const indexAddItem = document.getElementById("indexAddTask");
const auxDeleteItem = document.getElementById("deleteButton");
const auxItemToNextColumn = document.getElementById("nextButton");
let itemsCreatedObj = []; // Stores the Todo's object, as in a "database".



function openForm() {
  indexAddTask.style.display = "block";
}

function closeForm() {
  indexAddTask.style.display = "none";
}

function openItem(id) {
  document.getElementById("myTask").style.display = "block";
  myTaskTitle.innerHTML = itemsCreatedObj[id].title;
  myTaskDescription.value = itemsCreatedObj[id].description;
  auxDeleteItem.setAttribute("onclick", `deleteItem(${id})`);
  auxItemToNextColumn.setAttribute("onclick", `itemToNextColumn(${id})`);
}

function deleteItem(id) {
  document.getElementById("myTask").style.display = "none";
  myTaskTitle.innerHTML = "";
  myTaskDescription.value = "";
  itemsCreatedObj[id] = undefined;
  let itemRemoval = document.getElementById(`${id}`);
  itemRemoval.remove();
}

function closeItem() {
  document.getElementById("myTask").style.display = "none";
  myTaskTitle.innerHTML = "";
  myTaskDescription.value = "";
}

function itemToNextColumn(id) {
	let itemMove = document.getElementById(`${id}`);
	console.log(itemsCreatedObj[id].status)
	if(itemsCreatedObj[id].status === "unstarted") {
		itemsCreatedObj[id].status = "started";
		columnInitiated.append(itemMove);
	} else {
		itemsCreatedObj[id].status = "finished";
		columnFinished.append(itemMove);
	}
}


class TaskTodo {
  constructor(status, title, description, dueDate, priority) {
    this.status = status;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
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

function createItemTodo() {
  const newItem = document.createElement('div');
  newItem.classList.add('items');
  newItem.setAttribute('id', createItemUniqueId())
  itemsCreatedObj[newItem.id] = new TaskTodo("unstarted", myTitle.value, myDescription.value);
  newItem.innerHTML = itemsCreatedObj[newItem.id].title;
  columnUninitiated.append(newItem);

  newItem.setAttribute("onclick", `openItem(${newItem.id})`);
}
