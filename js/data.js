class Todo {
  constructor() {
    this.todoList;
  }
  getData() {
    const dataJSON = localStorage.getItem('todoData');
    try {
      this.todoList = dataJSON ? JSON.parse(dataJSON) : [];
    } catch (e) {
      this.todoList = [];
    }
  }
  saveData() {
    localStorage.setItem('todoData', JSON.stringify(this.todoList));
  }
  addTask(taskText) {
    this.todoList.push(taskText);
    this.saveData();
  }
  removeTask(taskNum) {
    taskNum = parseInt(taskNum);
    try {
      this.todoList.splice(taskNum, 1);
      this.saveData();
    } catch (e) {
      console.error("ERROR: can't remove task");
    }
  }
  moveTaskUp(taskNum) {
    taskNum = parseInt(taskNum);
    try {
      if(taskNum > 0) {
        [this.todoList[taskNum-1], this.todoList[taskNum]] = [this.todoList[taskNum], this.todoList[taskNum-1]];
        console.log('change produced');
        this.saveData();
      }
    } catch (e) {
      console.error("ERROR: can't move task up");
    }
  }
  moveTaskDown(taskNum) {
    taskNum = parseInt(taskNum);
    try {
      if(taskNum < this.todoList.length - 1) {
        [this.todoList[taskNum+1], this.todoList[taskNum]] = [this.todoList[taskNum], this.todoList[taskNum+1]];
        this.saveData();
      }
    } catch (e) {
      console.error("ERROR: can't move task down");
    }
  }
  clearTaskList() {
    this.todoList = [];
    this.saveData();
  }
}