const taskInput = document.querySelector('.todo-input');
const btnAdd = document.querySelector('.btn-todo-add');
const btnUp = document.querySelector('.btn-todo-up');
const btnDown = document.querySelector('.btn-todo-down');
const btnRem = document.querySelector('.btn-todo-remove');
const status = document.querySelector('.status');
const todoUL = document.querySelector('.todo-ul');



const createHTMLelement = (tag, className, innerHTML, attributeKey, attributeValue) => {
  const el = document.createElement(tag);
  if(className) el.className = className;
  if(innerHTML) el.innerHTML = innerHTML;
  if(attributeKey && (attributeValue !== undefined)) el.setAttribute(attributeKey, attributeValue);
  return el;
}



const addButtonOnClickEvent = (buttonElementVariable, functionToRunOnButtonClick, todoDataList) => {
  buttonElementVariable.addEventListener('click', function(e) {
    const taskNum = e.target.parentElement.parentElement.getAttribute('task');
    todo[functionToRunOnButtonClick](taskNum);
    renderTodoUL(todoDataList);
  });
}



//*********************  START ****************************
const renderTodoUL = (todoDataList) => {
  todoUL.innerHTML = "";
  if (todoDataList.length === 0) {
    status.style.display = 'block';
  } else {
    status.style.display = 'none';
    todoDataList.forEach((taskObject, index, taskList) => {
      const li = createHTMLelement('li', '', '', 'task', index);
      const p = createHTMLelement('p', 'task-text', taskObject.task);
      const div = createHTMLelement('div', 'buttons');
  
      const btnUp = createHTMLelement('button', 'btn-todo-up', '&uarr;', 'title', 'move task up');
      if(index === 0) btnUp.style.display = 'none';
      addButtonOnClickEvent(btnUp, 'moveTaskUp', todoDataList);
        
      const btnDown = createHTMLelement('button', 'btn-todo-down', '&darr;', 'title', 'move task down');
      if(index === taskList.length - 1) btnDown.style.display = 'none';
      addButtonOnClickEvent(btnDown, 'moveTaskDown', todoDataList);
  
      const btnRem = createHTMLelement('button', 'btn-todo-remove', 'X', 'title', 'remove task');
      addButtonOnClickEvent(btnRem, 'removeTask', todoDataList);
  
      [btnUp, btnDown, btnRem].forEach(btn => div.appendChild(btn));
      li.appendChild(p);
      li.appendChild(div);
      todoUL.appendChild(li);
    });
  }
}
//*********************  END ****************************



//*********************  START ****************************
const enableTodoInput = (todoDataList) => {
  btnAdd.addEventListener('click', function(e) {
    if(taskInput.value.trim()) {
      todo.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL(todoDataList);
    }
  });
  
  taskInput.addEventListener('keydown', function(e) {
    if(e.which === 13 && taskInput.value.trim()) {
      // ^e.which identifies the key that triggered 'keydown'; code 13 --> 'enter' key
      todo.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL(todoDataList);
    }
  });
}
//*********************  END ****************************