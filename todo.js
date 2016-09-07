let fs = require("fs")
let prompt = require("prompt")
let filePath = "data.json"
prompt.start()

class List {
  constructor(data) {
    // Initialize list
    this.list = JSON.parse(data)
    this.arguments = []

    // Get arguments from console
    process.argv.forEach((val, index) => {
      if (index > 1)
        this.arguments.push(val)
    })

    // Switch cases based on arguments passed
    switch(this.arguments[0]) {
      case "list":
      this.viewTasks()
      break
      case "add":
      this.addTask()
      break
      case "complete":
      this.completeTask()
      break
      case "delete":
      this.deleteTask()
      break
      case "help":
      this.errorMessage()
      break
    }
  }

  // View all tasks in list
  viewTasks() {
    let taskType = ""
    let count = 1
    let taskList = []

    // Learn from argument passed for list
    switch(this.arguments[1]) {
      case "-i":
      taskType = "in progress"
      break
      case "-c":
      taskType = "completed"
      break
      case "-d":
      taskType = "deleted"
      break
      case "-a":
      case undefined:
      taskType = "total"
      console.log("test")
      break
      default:
      this.errorMessage()
      return
    }

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].status == taskType || taskType == "total") {
        taskList.push(this.list[i])
      }
    }

    console.log(`\x1Bc`)
    console.log(`-------------------------------------------`)
    console.log(`You have ${taskList.length} ${taskType} tasks`)
    console.log(`-------------------------------------------`)

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].status == taskType || taskType == "total") {
        console.log(`[${i + 1}]: ${this.list[i].task} (${this.list[i].status})`)
      }
    }

    console.log(`-------------------------------------------`)
    console.log(`'node todo.js help' for help`)
    console.log()
  }

  // Add task to To-Do list
  addTask() {
    let taskStr = ""
    let taskObj = {}
    for (var i = 1; i < this.arguments.length; i++) {
      taskStr += this.arguments[i]
    }
    if (taskStr == "") {
      console.log(`Please enter a new task: add <new_task>`)
    } else {
      taskObj.task = taskStr
      taskObj.status = "in progress"
      this.list.push(taskObj)
      console.log(`Added "${taskStr}" to your To-Do list.`)
      this.writeFile()
    }
  }

  // Mark task on To-Do list as complete
  completeTask() {
    let taskNum = this.arguments[1]
    if (taskNum != null && taskNum.match(/\d/) != null) {
      if (this.list[taskNum - 1] != null && this.list[taskNum - 1].status == "in progress") {
        this.list[taskNum - 1].status = "completed"
        console.log(`Task "${this.list[taskNum - 1].task}" is marked as complete.`)
        this.writeFile()
      } else {
        console.log(`Please select a Task ID with status "in progress."`)
      }
    } else {
      this.errorMessage()
    }
  }

  // Delete task to To-Do list
  deleteTask() {
    let taskNum = this.arguments[1]
    if (taskNum != null && taskNum.match(/\d/) != null) {
      if (this.list[taskNum - 1] != null && this.list[taskNum - 1].status == "in progress") {
        this.list[taskNum - 1].status = "deleted"
        console.log(`Deleted "${this.list[taskNum - 1].task}" from your To-Do list.`)
        this.writeFile()
      } else {
        console.log(`Please select a Task ID with status "in progress."`)
      }
    } else {
      // this.errorMessage()
    }
  }

  updateStatus(id) {
    this.list[id].status = "complete"
    console.log(this.list[id])
  }

  errorMessage() {
    console.log(`\x1Bc`)
    console.log(`-------------------------------------------`)
    console.log(`Welcome to To-Do List Makerer`)
    console.log(`-------------------------------------------`)
    console.log()
    console.log(`List all tasks in To-Do list`)
    console.log(`  list -a               List all tasks`)
    console.log(`  list -i               List in progress tasks`)
    console.log(`  list -c               List completed tasks`)
    console.log(`  list -d               List deleted tasks`)
    console.log()
    console.log(`Add a new task to To-Do list`)
    console.log(`  add <Task>            Add a new task`)
    console.log()
    console.log(`Mark a task as complete from To-Do list (In Progress only)`)
    console.log(`  complete <Task ID>    Complete task`)
    console.log()
    console.log(`Delete a task from To-Do list (In Progress only)`)
    console.log(`  delete <Task ID>      Delete task`)
    console.log()
  }

  writeFile() {
    fs.writeFile(filePath, JSON.stringify(this.list), (err) => {
      if (err) throw err;
    });
  }
}

// Read from data.json
fs.readFile(filePath, (err, data) => {
  if (err) throw err;

  // If data is loaded, load the list
  let list = new List(data)
});



// Remove task from To-Do list

// Mark a task as complete

// Parse user input and execute user command

// Parse file data.json
