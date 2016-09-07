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
    console.log(`================TO-DO (HELP)=================`);
    console.log(`node todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>`);
    console.log(`=============================================`);
    break;

    case "list":
      console.log(`================TO-DO (LIST)=================`);
    for (var i = 0; i < data.length; i++){
      console.log(`${i+1}. ${data[i].status} ${data[i].task}`);
      console.log(`---------------------------------------------`);
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
      console.log(`================TO-DO (ADD)================`);
      console.log(`Memasukan ${addTemp} ke TODO list anda`);
      console.log(`===========================================`);
    }
    break;

    case "task":
      if(array.length >3){
        console.log(`================TO-DO (TASK)=================`);
        console.log(data[array[3]-1]);
        console.log(`=============================================`);
      }
    break;

    case "delete":
    if (array.length >3){
      data.splice(array[3]-1,1)
      jsonfile.writeFileSync(file, data)
    }
    console.log(`================TO-DO (DELETE)=================`);
    console.log("data telah dihapus");
    console.log(`===============================================`);
    break;

    case "complete":
    if(array.length > 3){
      data[array[3]-1].status="[x]-(selesai)"
      jsonfile.writeFileSync(file, data)
      console.log(`================TO-DO (COMPLETE)=================`);
      console.log(`task ke: ${array[3]} sudah selesai`);
      console.log(`=================================================`);
    }
    break;

    case "uncomplete":
    if(array.length > 3){
      data[array[3]-1].status="[ ]-(belum selesai)"
      jsonfile.writeFileSync(file, data)
      console.log(`================TO-DO (UNCOMPLETE)=================`);
      console.log(`task ke: ${array[3]} belum selesai`);
      console.log(`===================================================`);
    }
    break;

}
});
