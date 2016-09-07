
class Task {
  constructor(component) {
    this.taskID = component['taskID']
    this.task = component['task']

  }

  addTask(value,target){
    this.task = value

 }
 list (){

   for (let i=0;i<listTaskJSON.length;i++)
   console.log(listTaskJSON[i].task);
 }

}

export default Task
