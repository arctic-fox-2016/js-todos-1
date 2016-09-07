
import Parser from "./parser.js"
import Task from "./task.js"
const fs = require('fs')
class Todo {
  constructor(){
  this.taskslist = Parser.getFileTodo()
}

  help(){
    console.log("-------------TODO-----------------")
    console.log("node todo.js list")
    console.log("node todo.js add <taskId>")
    console.log("node todo.js task <taskId>")
    console.log("node todo.js delete <taskId>")
    console.log("node todo.js completetion <taskId>")
    console.log("node todo.js uncomplete <taskId>")
    console.log("")
    console.log("")
    console.log("_____________________________by: banakun")
  }
  adddata(task){

    let idtoInsert = 0
    if(this.taskslist.length < 1) {
      //kalau data kosong id = 1
      idtoInsert = 1
    } else{
      //kalau tasklist sudah ada auto generate id
      idtoInsert = +(this.taskslist[this.taskslist.length-1].id)+1
    }
    let taskObject = new Task({
      id: idtoInsert,
      status: " ",
      desc:  task,
      createdAt: new Date(),
      lastUpdate: new Date()
    })
    this.taskslist.push(taskObject)
    let dataToSave = JSON.stringify(this.taskslist)
    Parser.saveToFileTodo(dataToSave)
  }
  list(){
    if(this.taskslist.length > 0){
    this.taskslist.forEach((val, index, array) => {
         console.log(`${val['id']}. [${val['status']}] ${val['desc']}        <created: ${val['createdAt']} | lastUpdate: ${val['lastUpdate']}>`)
       })
     }else{
         console.log("belum ada task")
         console.log("untuk menambahkan task berikan perintah seperti berikut");
         console.log("node todo.js add <task>");
       }
    }

  task(taskId){
    let found = false
    if(this.taskslist.length > 0){
    this.taskslist.forEach((val, index, array) => {
         if(val['id'] === +(taskId)) console.log(`${val['id']}. [${val['status']}] ${val['desc']}        <created: ${val['createdAt']} | lastUpdate: ${val['lastUpdate']}>`)

       })
     }else{
         console.log("belum ada task")
         console.log("untuk menambahkan task berikan perintah seperti berikut");
         console.log("node todo.js add <task>");
       }

  if(!found) console.log("task not found")
  }
  completetion(taskId){
   if(this.updateCompletetion(taskId,"X"))console.log("task updated")
}
  uncomplete(taskId){

if(this.updateCompletetion(taskId," "))console.log("task updated")
}
delete(taskId){
  let statusUpdate = false
  let taskpointer = this.taskslist
  taskpointer.forEach((val, index, array) => {
       if(+(taskId) === val['id']){
         taskpointer.splice(index,1)
         statusUpdate = true
       }
  })
  if(!statusUpdate){
    console.log(`no task with ${taskId} id`)
} else{
  taskpointer.map((val,idx,array)=>{
    val['id'] = idx+1
    return this
  })
  let dataToSave = JSON.stringify(taskpointer)
  Parser.saveToFileTodo(dataToSave)
}
}
updateCompletetion(taskId,status){
  let statusUpdate = false
  let taskpointer = this.taskslist
  taskpointer.forEach((val, index, array) => {
     if(+(taskId) === val['id']){
       taskpointer[index]['status'] = status
       taskpointer[index]['lastUpdate'] = new Date()
       let dataToSave = JSON.stringify(taskpointer)
       Parser.saveToFileTodo(dataToSave)
       statusUpdate = true
     }
})
if(!statusUpdate) console.log(`no task with ${taskId} id`)
return statusUpdate
}


}

let todo = new Todo();
let arg = process.argv
if(arg.length < 3){
      console.log("Silahkan tambahkan argumen")
      console.log("contoh : node todo.js help")
      todo.help()
} else{
let command = arg[2]
let commandArg = arg.slice(3,arg.length).join(" ")
switch (command) {
  case "help":
        todo.help()
        break;
  case 'list':
        todo.list()
        break;
  case 'add':
        todo.adddata(commandArg)
        break;
  case 'task':
        todo.task(commandArg)
        break;
  case 'complete':
        todo.completetion(commandArg)
        break;
  case 'uncomplete':
        todo.uncomplete(commandArg)
        break;
  case 'delete':
        todo.delete(commandArg)
        break;
  default:
        todo.help()

}
}
