//Release 0
var fs = require('fs');
var readline = require('readline');
var args0 = process.argv.slice(1);
var args = process.argv.slice(2);
var args1 = process.argv.slice(3).join(" ")
var obj;
let addList = []
let listShow = []
let data = 'data.json'
class ToDo {
  constructor() {

  }

  static start() {
    console.log('Silahkan ketik perintah di bawah ini untuk memilih menu')
    console.log('$ node todo.js help      >>> Menampilkan help')
    console.log('$ node todo.js list      >>> Menampilkan daftar list ToDo')
    console.log('$ node todo.js add       >>> Menambah tugas baru')
    console.log('$ node todo.js delete    >>> menghapus tugas')
    console.log('$ node todo.js complete  >>> Menampilkan tugas yang sudah selesai')


    // fs.readFile('file', 'utf8', function (err, data) {
    //   if (err) throw err;
    //   obj = JSON.parse(data);
    // });
  }

  static delete(testd) {
    let lizt = JSON.parse(fs.readFileSync('data.json', "utf8"))
    lizt.pop({
      task: testd,
      done: false
    })
    fs.writeFile(data, JSON.stringify(lizt), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The task was removed!");
      List.showList()
    });
  }

  static help(testd) {
    ToDo.start()
  }

  static remove() {
    console.log()

  }
}
class List {
  // let arrList = []
  static showList() {

    console.log('--------------- To Do List --------------------');
    var buf = JSON.parse(fs.readFileSync('data.json', "utf8"));
    // for (let i = 0; i < buf.length; i++) {
    //   console.log(buf[i]["task"]);
    // };
    display(buf);
  }


}

function display(list) {
  for (var i = 0; i < list.length; i++) {
    console.log(`${i+1}. Task: ${list[i].task}`)
  }
}


class Add {

  static add(test) {
    let lizt = JSON.parse(fs.readFileSync('data.json', "utf8"))
    lizt.push({
      task: test,
      done: false
    })
    fs.writeFile(data, JSON.stringify(lizt), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The task was saved!");
    });
  }

}




// args0.forEach((val) => {
//   ToDo.start()
// })


switch (process.argv[2]) {
case 'list':
  List.showList()
  break;
case 'add':
  Add.add(args1)
  console.log(args1);
  break;
case 'delete':
  ToDo.delete()
  break;
case `remove`:
  ToDo.remove()
  break;
case 'help':
  ToDo.help()
  break;
default:
  ToDo.start()

  break;

};


// var rl = readline.createInterface(process.stdin, process.stdout);
// rl.setPrompt('> ');
// rl.prompt();
// rl.on('line', function (line) {
//   if (line === "list") {
//     List.showList()
//   };
//   // rl.close(){
//   rl.prompt()
// }).on('close', function () {
//   process.exit(0);
// });
//
