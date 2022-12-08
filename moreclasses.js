// Task Class will represent a Task

class Task {

    constructor (title, desc, assignTo, duedate, status ){

           // will increment id with every instantiation of task object
        this.title = title
        this.desc = desc
        this.assignTo = assignTo
        this.duedate = duedate
        this.status = status
    }



}

// UI Class will display and manipullate UI 
// dont want to instantiate the UI class so all its 
// methods are going to be static

class UI {

    static displayTasks(){

    

        // get tasks from llocal storage

        const tasks = Store.getTasks();

        tasks.forEach((task) => 
            UI.addTasksToList(task)
        );




    }
    static addTasksToList(task){



        const list = document.querySelector('#task-list')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.desc}</td>
        <td>${task.duedate}</td>
        <td>${task.assignTo}</td>
        <td>${task.status}</td>
        <td><a href = "#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        // append row to the list (table body)

        list.appendChild(row);
    }
//using event propagation to target the element (tag) having class 'delete' with actual list
// parent element of X link is <td> and parent of <td> is <tr> that has the task object displayed in UI
// so remove the the parent of a and parent of <td>

static deleteTask(el){

    // if the element to be clicked has the class 'delete'

        if (el.classList.contains('delete')){

            
             // this will <tr> which is parent of <td> and <td> is the parent of <a> that has X (with delete class)
            el.parentElement.parentElement.remove();


        }




    }

    // style the input error messages and insert it into dom

    // using bootstrap alert messages as "alert-success" "alert-danger"

    static showError(message,className){

        // create a div , set its alert class and add text(message) to div 

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));


        // target the location in HTML where that div will be inserted with message 

        const container = document.querySelector('.container');
        const form = document.querySelector('#taskform');
        
        // insert the div with alert message before the <form> tage
        container.insertBefore(div,form);

        // remove the error message after 3 seconds 

        setTimeout(()=> document.querySelector('.alert').remove(),3000);



    }



    static clearInputs(){

        document.querySelector('#tasktitle').value = '';
        document.querySelector('#tdesc').value = '';
        document.querySelector('#tassignee').value = '';
        document.querySelector('#tdate').value = '';
        document.querySelector('#tstatus').value = '';




    }


}



// Store Class will handle with local Storage 


class Store {

    // making all methods static so that methods can be callled with object instantiation 

    // will store task objects as strings using JS stringnify method and will JS parse the object when retrieve from local storage  

static getTasks(){

    let tasks;

    // if there are no tasks in the local storage (when reading the local storage first time , it will be empty)
    // set tasks to empty array 

    if (localStorage.getItem('tasks')=== null){

        tasks = [];


    } else  {// if there are any tasks then return the tasks 

    tasks = jason.parse(localStorage.getItem('tasks'))
     
    }

    return tasks;




}

static addTask(task){

    // get tasks from local storage 

    const tasks = Store.getTasks();

    // push task to tasks array

    tasks.push(task);

    // reset local storage after pushing task to tasks

    localStorage.setItem('tasks',JSON.stringnify(tasks));



}

static removeTask(id){

    const tasks = Store.getTasks();

    tasks.forEach((task,index) => {
        if (task.id === id) {

            tasks.splice(index,1);


        }
    });

    tasks.localStorage('tasks',JSON.stringnify(tasks))


}

}

// Events : Add a Task , Remove a Task , display Tasks

//event display tasks

document.addEventListener('DOMContentLoaded',UI.displayTasks);

// Add a task 

document.querySelector('#taskform').addEventListener('submit',(e) => {


    // prevent actual submit event of the form

    e.preventDefault();

    // get form values 

    const title = document.querySelector('#tasktitle').value;
    const desc = document.querySelector('#tdesc').value;
    const assignTo = document.querySelector('#tassignee').value;
    const duedate = document.querySelector('#tdate').value;
    const status = document.querySelector('#tstatus').value;

    // validation of input

    if (title === '' || desc === '' || assignTo === '' || duedate === ''|| status === '' ){

        // calling the show error method with custom message and bootstap alert class name 'danger'

        UI.showError('Please fill in all values with valid input', 'danger');


    } else {

   // instantiate a task
   const task = new Task(title,desc,assignTo,duedate,status);
   console.log(task)

   // Add Task to UI

   UI.addTasksToList(task);

   // Add task to Local Store
   Store.addTask(task);

   // display success message after a task is successfully added
   UI.showError('Task successfully added', 'success');

// clear the input fields after user enters input values 


   UI.clearInputs();

    }


});

// Delete Task 

// target the tbody area where the task is displayed andd delete task object on clicking X

document.querySelector('#task-list').addEventListener('click',(e)=> {
    
    // see the target element in console first
    console.log(e.target)

    UI.deleteTask(e.target)
    // display error message after deleting a task 

    UI.showError('Task deleted', 'success')
}


)



