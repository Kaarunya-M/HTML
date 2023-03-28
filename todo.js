const taskInput=document.querySelector(".task-input input"),
filters= document.querySelectorAll(".filters span"),
clearAll=document.querySelector(" .clear-btn"),
taskBox=document.querySelector(".task-box");

let editId;
let isEditedTask=false;

//get local-storage
//It throw an error that push is not a function.
 //So have to parse the localstorage data to js object
let todo = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
   btn.addEventListener("click", () => {
      document.querySelector("span.active").classList.remove("active");
      btn.classList.add("active");
      showTodo(btn.id);
   });
});

function showTodo(filter){
    let li="";
    if(todo){
    todo.forEach((todos, id) => {
        //if todos status is completed, set the isComplete value to 'checked'
        let isCompleted = todos.status=="completed" ? "checked":"";
        if(filter==todos.status || filter=="all"){
        li += `<li class="task">
               <label for="${id}">
                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                  <p class="${isCompleted}">${todos.name}</p>
               </label>
               <div class="settings">
                  <i onclick="showMenu(this)" class="uil uil-ellipsis-v"></i> 
                  <ul class="task-menu">
                    <li onclick="editTask(${id}, '${todos.name}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                  </ul>
               </div>
               </li>`;
             }
            });
        }
        //if li isn't empty, insert this value inside the textbox 
        //else insert span
    taskBox.innerHTML=li || `<span>You don't have any task here!</span>`;
}
showTodo("all");

function showMenu(selectedTask){
    //get task menu div
    let taskMenu=selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        //remove show class from the task menu on the document click
        if(e.target.tagName!= "1" || e.target!= selectedTask){
            taskMenu.classList.remove("show");

        }
    });
}
function editTask(taskId, taskName){
    editId=taskId;
    isEditedTask=true;
    taskInput.value=taskName;
}

function deleteTask(deleteId){
   todo.splice(deleteId,1); //remove the selected task from array
   localStorage.setItem("todo-list",JSON.stringify(todo));//saving to localstorage with "todo-list" name
   showTodo("all");
}

clearAll.addEventListener("click", () => {
    todo.splice(0, todo.length); //remove all from array
    localStorage.setItem("todo-list",JSON.stringify(todo));//saving to localstorage with "todo-list" name
    showTodo("all");
});

function updateStatus(selectedTask){
    //get para that contains task name
    let taskName=selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todo[selectedTask.id].status="completed";//update the status of selected task to 'completed'
    } else{
        taskName.classList.remove("checked");
        todo[selectedTask.id].status="pending";// update the status of selected task to 'pending'
      }
      localStorage.setItem("todo-list",JSON.stringify(todo));//saving to localstorage with "todo-list" name
    }

taskInput.addEventListener("keyup",e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){ //if isEditedTask isn't true
            if(!todo){
                todo=[];//if todo doesn't exists, pass an empty array to todo   
            }
            let taskInfo={name: userTask, status: "pending"};//by default, task status will be pending
            todo.push(taskInfo);//add new task to todo
          } else {
            isEditedTask=false;
            todo[editId].name=userTask;
          }
        
        taskInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todo));//saving to localstorage with "todo-list" name
        showTodo("all");
    }
});