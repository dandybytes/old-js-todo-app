class Todo {
  constructor() {
    this.todoList;
  }
  loadSampleData(sampleDataArr) {
    this.todoList = sampleDataArr;
  }
  getDataLocalStorage() {
    const dataJSON = localStorage.getItem('todoData');
    try {
      this.todoList = dataJSON ? JSON.parse(dataJSON) : [];
    } catch (e) {
      this.todoList = [];
    }
  }
  saveDataLocalStorage() {
    localStorage.setItem('todoData', JSON.stringify(this.todoList));
  }
  // getDataFileSystem() {
    
  // }
  // saveDataFileSystem() {

  // }
  addTask(taskText, timeMilliseconds) {
    this.todoList.push({
      task: taskText,
      created: timeMilliseconds,
      updated: timeMilliseconds,
      completed: false,
      priority: 1
    });
    this.saveDataLocalStorage();
  }
  removeTask(taskNum) {
    taskNum = parseInt(taskNum);
    try {
      this.todoList.splice(taskNum, 1);
      this.saveDataLocalStorage();
    } catch (e) {
      console.error("ERROR: can't remove task");
    }
  }
  switchTasks(numCurrentTask, numOtherTask) {
    numCurrentTask = parseInt(numCurrentTask);
    numOtherTask = parseInt(numOtherTask);
    if(numOtherTask >= 0 && numOtherTask < this.todoList.length) {
      try {
        [this.todoList[numCurrentTask], this.todoList[numOtherTask]] = [this.todoList[numOtherTask], this.todoList[numCurrentTask]];
        this.saveDataLocalStorage();
      } catch (e) {
        console.error("ERROR: can't switch tasks");
      }
    }
  }
  moveTaskUp(taskNum) {
    taskNum = parseInt(taskNum);
    try {
      if(taskNum > 0) {
        [this.todoList[taskNum-1], this.todoList[taskNum]] = [this.todoList[taskNum], this.todoList[taskNum-1]];
        this.saveDataLocalStorage();
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
        this.saveDataLocalStorage();
      }
    } catch (e) {
      console.error("ERROR: can't move task down");
    }
  }
  clearTaskList() {
    this.todoList = [];
    this.saveDataLocalStorage();
  }
}