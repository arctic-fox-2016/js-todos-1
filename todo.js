const fs = require("fs")

class ToDo{
  constructor(){
      this.allList = readFile()
    }

  addTask(value){
    var newTask = {
      "task" : value,
      "isChecked" : false
    }

    this.allList.push(newTask)
    writeFile(this.allList)
  }

  deleteTask(id){
    this.allList.splice(id-1,1)
    writeFile(this.allList)
  }

  completeTask(id){
    this.allList[id-1]["isChecked"] = true
    writeFile(this.allList)
  }

  unCompleteTask(id){
    this.allList[id-1]["isChecked"] = false
    writeFile(this.allList)
  }

  cetakToDo(){

    console.log("\n\n To Do List\n")
    for (var i=0; i<this.allList.length; i++){
      var temp = ""
      if (this.allList[i]["isChecked"]) {
        temp += "[x] "
      } else {
        temp += "[ ] "
      }
      temp += i + 1 + ". "
      temp += this.allList[i]["task"]
      console.log(temp)
    }
    console.log("\n\n");

  }

  help(){
    console.log("\n\nHello, enter a command \n\n")
    console.log("help : show this help")
    console.log("list : to show all the list")
    console.log("add <tast> : to add new task")
    console.log("delete <number> : to delete task number <number>")
    console.log("complete <number> : to complete task number <number>")
    console.log("complete <number> : to complete task number <number>\n\n")
  }

  cariPerintah(argu){

    switch (argu[2]) {
      case "help" :
        this.help()
        break;
      case "list" :
        this.cetakToDo()
        break
      case "add" :
        if (argu.length>3) {
          var argu3 = ""
          for (var i=3; i<argu.length; i++ ){
            argu3 += argu[i] + " "
          }
          this.addTask(argu3)
          this.cetakToDo()
        } else {
          console.log("\n\n!!! Nothing to add")
          this.cetakToDo()
        }
        break
        case "delete" :
          if (argu.length>3) {
            var argu3 = ""
            for (var i=3; i<argu.length; i++ ){
              argu3 += argu[i] + " "
            }
            this.deleteTask(argu3)
            this.cetakToDo()
          } else {
            console.log("\n\n!!! Nothing to delete")
            this.cetakToDo()
          }
          break
      case "uncomplete" :
        if (argu.length>3) {
          this.unCompleteTask(argu[3])
          this.cetakToDo()
        } else {
          console.log("\n\n!!! Enter list number")
          this.cetakToDo()
        }
        break
        case "complete" :
          if (argu.length>3) {
            this.completeTask(argu[3])
            this.cetakToDo()
          } else {
            console.log("\n\n!!! Enter list number")
            this.cetakToDo()
          }
          break
      default :
        this.help()
    }
  }
}

function writeFile(data){
  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

function readFile(){
  return JSON.parse(fs.readFileSync('data.json', "utf8"))
}

let myToDo = new ToDo()

//  myToDo.allList = JSON.parse(data)
myToDo.cariPerintah(process.argv)
