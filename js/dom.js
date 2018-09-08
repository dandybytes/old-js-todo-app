const taskInput = document.querySelector('.todo-input');
const btnAdd = document.querySelector('.btn-todo-add');
const btnToggleCompleted = document.querySelector('.btn-toggle-completed');
const btnRemoveAll = document.querySelector('.btn-remove-all');
const btnUp = document.querySelector('.btn-todo-up');
const btnDown = document.querySelector('.btn-todo-down');
const btnRem = document.querySelector('.btn-todo-remove');
const checkbox = document.querySelector('.checkbox');
const status = document.querySelector('.status');
const todoUL = document.querySelector('.todo-ul');
let hideCompleted = false;
const toggleCompletedMessage = ['hide completed', 'show completed'];



const createHTMLelement = (tag, className, innerHTML, attributeKey, attributeValue) => {
  const el = document.createElement(tag);
  if(className) el.className = className;
  if(innerHTML) el.innerHTML = innerHTML;
  if(attributeKey && (attributeValue !== undefined)) el.setAttribute(attributeKey, attributeValue);
  return el;
}



//*********************  START ****************************

const renderHeader = () => {
  btnAdd.addEventListener('click', function(e) {
    if(taskInput.value.trim()) {
      todoObj.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL();
    }
  });

  btnToggleCompleted.textContent = toggleCompletedMessage[+hideCompleted];

  btnToggleCompleted.addEventListener('click', function(e) {
    hideCompleted = !hideCompleted;
    btnToggleCompleted.textContent = toggleCompletedMessage[+hideCompleted];
    renderTodoUL();
  })
  
  taskInput.addEventListener('keydown', function(e) {
    if(e.which === 13 && taskInput.value.trim()) {
      // ^e.which identifies the key that triggered 'keydown'; code 13 --> 'enter' key
      todoObj.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL();
    }
  });
}
//*********************  END ****************************





const addButtonOnClickEvent = (buttonElementVariable) => {
  buttonElementVariable.addEventListener('click', function(e) {
    const buttonElement = e.target;
    const buttonElementClassList = buttonElement.className;
    const currentTaskElement = buttonElement.parentElement.parentElement;
    const numCurrentTask = {};
    numCurrentTask.dataNum = currentTaskElement.getAttribute('data-list-num');
    numCurrentTask.domNum = currentTaskElement.getAttribute('dom-list-num');
    let numPreviousTask = {},
        numNextTask = {};
    if(numCurrentTask.domNum > 0) {
      const previousElement = currentTaskElement.previousElementSibling;
      numPreviousTask.dataNum = previousElement.getAttribute('data-list-num');
    }
    if(currentTaskElement.nextElementSibling) {
      const nextElement = currentTaskElement.nextElementSibling;
      numNextTask.dataNum = nextElement.getAttribute('data-list-num');
    }
    if(buttonElementClassList.includes("down")) {
      todoObj.switchTasks(numCurrentTask.dataNum, numNextTask.dataNum);
    }
    if(buttonElementClassList.includes("up")) {
      todoObj.switchTasks(numCurrentTask.dataNum, numPreviousTask.dataNum);
    }
    if(buttonElementClassList.includes("remove")) {
      todoObj.removeTask(numCurrentTask.dataNum);
    }
    renderTodoUL();
  });
}




//*********************  START ****************************
const renderTaskListItem = (taskObject, indexShortList, shortList) => {
  const li = createHTMLelement('li', '', '', 'data-list-num', taskObject.index);
  li.setAttribute('dom-list-num', indexShortList);
  const divTask = createHTMLelement('div', 'task-wrapper');

  const spanCheckbox = createHTMLelement('span', 'checkbox');
  if(taskObject.completed) {
    spanCheckbox.classList.add('checked');
  }
  spanCheckbox.addEventListener('click', function(e) {
    const checkbox = e.target;
    checkbox.classList.toggle('checked');
    const numCurrentTask = checkbox.parentElement.parentElement.getAttribute('data-list-num');
    todoObj.todoList[numCurrentTask].completed = !todoObj.todoList[numCurrentTask].completed;
    todoObj.saveDataLocalStorage();
    renderTodoUL();
  });
  
  const spanText = createHTMLelement('span', 'task-text', taskObject.task);
  if(taskObject.completed) {
    spanText.classList.add('crossed');
  }
  
  const divButtons = createHTMLelement('div', 'buttons');
  const btnUp = createHTMLelement('button', 'btn-todo-up', '&uarr;', 'title', 'move task up');
  if(indexShortList === 0) {
    btnUp.style.display = 'none';
  } else {
    addButtonOnClickEvent(btnUp, todoObj);
  }
    
  const btnDown = createHTMLelement('button', 'btn-todo-down', '&darr;', 'title', 'move task down');
  if(indexShortList === shortList.length - 1) {
    btnDown.style.display = 'none';
  } else {
    addButtonOnClickEvent(btnDown, todoObj);
  }

  const btnRem = createHTMLelement('button', 'btn-todo-remove', 'X', 'title', 'remove task');
  addButtonOnClickEvent(btnRem, todoObj);

  divTask.appendChild(spanCheckbox);
  divTask.appendChild(spanText);
  [btnUp, btnDown, btnRem].forEach(btn => divButtons.appendChild(btn));
  li.appendChild(divTask);
  li.appendChild(divButtons);
  todoUL.appendChild(li);
}
//*********************  END ****************************



//*********************  START ****************************
const renderTodoUL = () => {
  todoUL.innerHTML = "";
  if (todoObj.todoList.length === 0) {
    status.style.display = 'block';
  } else {
    status.style.display = 'none';
    if(!hideCompleted) {
      todoObj.todoList.forEach(function(taskObject, index, taskList) {
        renderTaskListItem(taskObject, index, taskList);
      });
    } else {
      todoObj.todoList.map((taskObject, i) => {
        taskObject.index = i;
        return taskObject;
      }).filter(taskObject => !taskObject.completed).forEach(function(taskObject, indexShortList, taskList) {
        // console.log(`hc new list item: indexFullList = ${taskObject.index}, indexShortList = ${indexShortList}`);
        renderTaskListItem(taskObject, indexShortList, taskList);
      });
    }
  }
}
//*********************  END ****************************