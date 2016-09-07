let fs = require ('fs')
let temp = []
class Task {
	constructor(input){
		this._namaTask = input||"default: Masukan nama task"
		this._status = " "
	}
}

class Generic{
	static readData(){
		temp = JSON.parse(fs.readFileSync('data.json', 'utf8'))
	}

	static writeData(){
		fs.writeFile('data.json', JSON.stringify(temp),function(err,data){})
	}
}

class KumpulanTask{
	constructor(){
		temp = JSON.parse(fs.readFileSync('data.json', 'utf8'))
	}

	addTask(input){
		Generic.readData()
		temp.push(new Task(input))
		Generic.writeData()
	}

	deleteTask(idx){
		Generic.readData()
		temp.splice(idx, 1)
		Generic.writeData()
	}

	completeTask(idx){
		Generic.readData()
		temp[idx]._status = "x"
		Generic.writeData()
	}

	uncompleteTask(idx){
		Generic.readData()
		temp[idx]._status = " "
		Generic.writeData()
	}

	displayTask(){
		Generic.readData()
		console.log("TO DO LIST KAMU")
		for (let idx in temp){
			console.log(`${idx}. ${temp[idx]._namaTask} [${temp[idx]._status}]`)
		}
	}

	displayMenu(){
		console.log("1. Add Task: example: node todo.js add 'makan buah'")
		console.log("2. Delete Task: example: node todo.js delete '2'")
		console.log("3. Display Task: example: node todo.js display")
		console.log("4. Menu: example: node todo.js help")
	}

	start(){
		switch (process.argv[2]) {
			case "add":
				this.addTask(process.argv[3])
				break;
			case "delete":
				this.deleteTask(process.argv[3])
				break;
			case "display":
				this.displayTask()
				break;
			case "help":
				this.displayMenu()
				break;
			case "complete":
				this.completeTask(process.argv[3])
				break;
			case "uncomplete":
				this.uncompleteTask(process.argv[3])
				break;
			default:
				this.displayMenu()
				break;
		}
	}

}
//Driver Code
let todoku = new KumpulanTask()
todoku.start()
