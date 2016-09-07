"use strict"
let fs = require('fs');
let content = fs.readFileSync("data.json");
let data = JSON.parse(content);
let input = ""
let idx = 0
let jsonfile = require('jsonfile')
var file = 'data.json'

process.argv.forEach((val, index, array) =>  {

  switch (val){
    case "help":
    console.log(`node todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode delete <task_id>\nnode complete <task_id>\nnode uncomplete <task_id>`);
    break;

    case "list":
    for (var i = 0; i < data.length; i++){
      console.log(`${i+1}. ${data[i].status} ${data[i].task}`);
    }
    break;

    case "add":
    if(array.length > 3){
      let addTemp = ""
      for(let i = 3; i < array.length; i++){
        addTemp += array[i]+ " "
      }
      addTemp = addTemp.substring(0,addTemp.length-1)

      data.push({task:addTemp,status:"belum selesai"})
      //console.log(data);
      jsonfile.writeFileSync(file, data)
      console.log(`Memasukan ${addTemp} ke TODO list anda`);
    }
    break;

    case "task":
      if(array.length >3){
        console.log(data[array[3]-1]);
      }
    break;

    case "delete":
    if (array.length >3){
      data.splice(array[3]-1,1)
      jsonfile.writeFileSync(file, data)
    }
    console.log("data telah dihapus");
    break;

    case "complete":
    if(array.length > 3){
      data[array[3]-1].status="[x]"
      jsonfile.writeFileSync(file, data)
      console.log(`task ke: ${array[3]} sudah selesai`);
    }
    break;

    case "uncomplete":
    if(array.length > 3){
      data[array[3]-1].status="[ ]"
      jsonfile.writeFileSync(file, data)
      console.log(`task ke: ${array[3]} belum selesai`);
    }
    break;

}
});
