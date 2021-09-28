function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const containerUninitiated = document.getElementById("uninitiated");
const myAddButton = document.getElementById("addButton");
const myTitle = document.getElementById("title");
const myDescription = document.getElementById("title");

class TaskTodo {
	constructor (status, title, description) {
		this.status = status;
		this.title = title;
		this.description = description;
	}
}
let itemsCreatedNumber = [];
let itemsCreatedObj = [];
let createItemUniqueId = () => {
  let count = 0;
  while (itemsCreatedNumber.includes(count)) {
    ++count
  }
  itemsCreatedNumber.push(count);

  return count;
}

function createItemTodo() {
  const newItem = document.createElement('div');
	newItem.classList.add('items');
  newItem.setAttribute('id', createItemUniqueId())
	itemsCreatedObj[newItem.id] = new TaskTodo("unstarted", myTitle.value,myDescription.value);
	newItem.innerHTML = itemsCreatedObj[newItem.id].title;
	containerUninitiated.append(newItem);
}

myAddButton.onclick = () => createItemTodo();
