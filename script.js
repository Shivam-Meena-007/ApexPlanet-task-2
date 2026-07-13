const form=document.getElementById("contactForm");

const result=document.getElementById("result");

form.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();

const email=document.getElementById("email").value.trim();

const message=document.getElementById("message").value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(name===""){

result.style.color="red";

result.innerHTML="Please enter your name.";

return;

}

if(!emailPattern.test(email)){

result.style.color="red";

result.innerHTML="Please enter a valid email.";

return;

}

if(message===""){

result.style.color="red";

result.innerHTML="Please enter your message.";

return;

}

result.style.color="green";

result.innerHTML="✅ Your message has been sent successfully!";

form.reset();

});

/* ===== Tab Switching ===== */

const tabButtons=document.querySelectorAll(".tab-btn");

const tabPanels=document.querySelectorAll(".tab-panel");

tabButtons.forEach(function(btn){

btn.addEventListener("click",function(){

tabButtons.forEach(function(b){ b.classList.remove("active"); });

tabPanels.forEach(function(p){ p.classList.remove("active"); });

btn.classList.add("active");

const target=btn.getAttribute("data-tab");

document.getElementById(target+"-panel").classList.add("active");

});

});

/* ===== To-Do List ===== */

const todoForm=document.getElementById("todoForm");

const todoInput=document.getElementById("todoInput");

const todoList=document.getElementById("todoList");

const todoEmpty=document.getElementById("todoEmpty");

let todos=[];

let todoIdCounter=0;

function renderTodos(){

todoList.innerHTML="";

if(todos.length===0){

todoEmpty.style.display="block";

}else{

todoEmpty.style.display="none";

}

todos.forEach(function(todo){

const li=document.createElement("li");

li.className="todo-item"+(todo.completed?" completed":"");

const span=document.createElement("span");

span.className="todo-text";

span.textContent=todo.text;

span.addEventListener("click",function(){

toggleTodo(todo.id);

});

const deleteBtn=document.createElement("button");

deleteBtn.className="todo-delete";

deleteBtn.innerHTML='<i class="fa-solid fa-trash"></i>';

deleteBtn.addEventListener("click",function(){

deleteTodo(todo.id);

});

li.appendChild(span);

li.appendChild(deleteBtn);

todoList.appendChild(li);

});

}

function addTodo(text){

todos.push({ id: todoIdCounter++, text: text, completed: false });

renderTodos();

}

function toggleTodo(id){

todos=todos.map(function(todo){

if(todo.id===id){

return Object.assign({},todo,{ completed: !todo.completed });

}

return todo;

});

renderTodos();

}

function deleteTodo(id){

todos=todos.filter(function(todo){ return todo.id!==id; });

renderTodos();

}

todoForm.addEventListener("submit",function(e){

e.preventDefault();

const text=todoInput.value.trim();

if(text===""){

return;

}

addTodo(text);

todoInput.value="";

});

renderTodos();