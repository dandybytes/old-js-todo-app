const taskInput = document.querySelector('.todo-input');
const btnAdd = document.querySelector('.btn-todo-add');
const btnUp = document.querySelector('.btn-todo-up');
const btnDown = document.querySelector('.btn-todo-down');
const btnRem = document.querySelector('.btn-todo-remove');
const status = document.querySelector('.status');
const todoUL = document.querySelector('.todo-ul');



const createElement = (tag, className, innerHTML, attributeKey, attributeValue) => {
  const el = document.createElement(tag);
  if(className) el.className = className;
  if(innerHTML) el.innerHTML = innerHTML;
  if(attributeKey && (attributeValue !== undefined)) el.setAttribute(attributeKey, attributeValue);
  return el;
}



const addButtonOnClickEvent = (buttonElementVariable, functionToRunOnButtonClick) => {
  buttonElementVariable.addEventListener('click', function(e) {
    const taskNum = e.target.parentElement.parentElement.getAttribute('task');
    todo[functionToRunOnButtonClick](taskNum);
    renderTodoUL();
  });
}



//*********************  START ****************************
const renderTodoUL = () => {
  todoUL.innerHTML = "";
  if (todo.todoList.length === 0) {
    status.style.display = 'block';
  } else {
    status.style.display = 'none';
    todo.todoList.forEach((taskText, index, taskList) => {
      const li = createElement('li', '', '', 'task', index);
      const p = createElement('p', 'task-text', taskText);
      const div = createElement('div', 'buttons');
  
      const btnUp = createElement('button', 'btn-todo-up', '&uarr;', 'title', 'move task up');
      if(index === 0) btnUp.style.display = 'none';
      addButtonOnClickEvent(btnUp, 'moveTaskUp');
        
      const btnDown = createElement('button', 'btn-todo-down', '&darr;', 'title', 'move task down');
      if(index === taskList.length - 1) btnDown.style.display = 'none';
      addButtonOnClickEvent(btnDown, 'moveTaskDown');
  
      const btnRem = createElement('button', 'btn-todo-remove', 'X', 'title', 'remove task');
      addButtonOnClickEvent(btnRem, 'removeTask');
  
      [btnUp, btnDown, btnRem].forEach(btn => div.appendChild(btn));
      li.appendChild(p);
      li.appendChild(div);
      todoUL.appendChild(li);
    });
  }
}
//*********************  END ****************************



//*********************  START ****************************
const enableTodoInput = () => {
  btnAdd.addEventListener('click', function(e) {
    if(taskInput.value.trim()) {
      todo.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL();
    }
  });
  
  taskInput.addEventListener('keydown', function(e) {
    if(e.which === 13 && taskInput.value.trim()) {
      // ^e.which identifies the key that triggered 'keydown'; code 13 --> 'enter' key
      todo.addTask(taskInput.value);
      taskInput.value = "";
      renderTodoUL();
    }
  });
}
//*********************  END ****************************