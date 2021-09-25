class todoItem {
    constructor(status, description, title, dueDate, priority) {
        this.status = status;
        this.description = description;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    editStatus() {};
    editContent() {};
}

let todo = new todoItem("Unstarted", "task decription");

console.log(todo.status = "asd");