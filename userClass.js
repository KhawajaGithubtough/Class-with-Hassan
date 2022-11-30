







class Tasks {
    constructor(id) {
        this.id = id;
        this.task = [];
    }

    // ADD task to this.task ARRAY
    addTask(name,description,assignto,duedate,status) {
        name = document.getElementById('tasktitle').value
        description = document.getElementById('tdesc').value
        assignto = document.getElementById('tassignee').value
        duedate = document.getElementById('tdate').value
        status = document.getElementById('tstatus').value

        // VALIDATION EXAMPLE
        if (!assignto || !name || !description || !duedate || !status) {
            console.log("Enter correct values")
        } else {

            let newTask = {
                'id': this.id++,
                'taskname': name,
                'taskdetails': description,
                'taskassigned': assignto,
                'taskduedate': duedate,
                'taskstatus': status
                

            }
            // PUSH task object to task array HERE
            this.task.push(newTask)
            // SAVE TO LOCAL STORAGE
            this.save(newTask)

        }
    }

    // SHOW ALL TASK IN THIS.USERS ARRAY
   static showTasks() {

        //set the target div (showTasks) innerhtml to empty

        document.getElementById("showTasks").innerHTML="";

        // retrieve saved tasks from local storage
        
        let task_records=new Array();

        // if tasks already exist in local storage return task else return empty array

        task_records=JSON.parse(localStorage.getItem("task"))?JSON.parse(localStorage.getItem("task")):[]
        


        for (let i = 0; i < task_records; i++) {

            // add a div for the target div
            let addDiv=document.createElement('div');

            // set as row

            addDiv.className="row";

            // display records . appending divs and concatenating object values using object keys

            addDiv.innerHTML='<div class="col-sm-4" style="padding: 10px;">'+task_records[i].taskname+
            '</div><div class="col-sm-4" style="padding: 10px;">'+task_records[i].taskdetails+
            '</div><div class="col-sm-4" style="padding: 10px;">'+task_records[i].taskassigned+
            '</div><div class="col-sm-4" style="padding: 10px;">'+task_records[i].taskduedate+
            '<div class="col-sm-4" style="padding: 10px;">'+task_records[i].taskstatus;

            //append as child to the target div
            document.getElementById("showTasks").appendChild(addDiv);

        }
    }

    // DELETE USER
    deleteTask(id) {
        this.task.splice(id, 1)
    }

    // SAVE TO LOCAL STORAGE
    save(item) {
        localStorage.setItem("task", JSON.stringnify(item))

    }

    // RETRIEVE LOCAL STORAGE
    load() {

        this.task = JSON.parse(localStorage.getItem("taskname"))?JASON.parse(localStorage.getItem("task")):[]
        console.log(this.task)
    }

}

// NEW INSTANCE OF TASK INITIALISED WITH 0 ID

// ADD TASK

//newTask.deleteUser(0)


document.querySelector('#taskform').addEventlistener('submit',(e) => {

    e.preventdefault();
    let newTask = new Tasks(0);
    newTask.addTask(name,description,assignto,duedate,status)
    

    newTask.showTasks()






});


