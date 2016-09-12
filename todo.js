var fs = require('fs')

class Task {
	constructor(input) {
		this.task = input
		this.status = "X"
	}
}

class Program{
	constructor(){
		this.list = JSON.parse(fs.readFileSync('data.json'))
	}

	tasklist(){
		for(let i = 0; i < this.list.length; i++){
			console.log((i+1) + ". " + this.list[i].task + ". Status: " + this.list[i].status)
		}
	}

	addtask(input){
		this.list.push(new Task(input))
		fs.writeFile('data.json',JSON.stringify(this.list));
		console.log(input + " berhasil ditambahkan!")
	}

	deletetask(input){
		let found = 0

		for(let i = 0; i < this.list.length; i++){
			if(input == this.list[i].task){
				this.list.splice(i,1)
				fs.writeFile('data.json',JSON.stringify(this.list))
				console.log(input + " berhasil dihapus!")
				found = 1
			}
		}
		if(found == 0){
				console.log(input + " tidak ditemukan!")
		}
	}

	checktask(input){
		let found = 0

		for(let i=0; i<this.list.length;i++){
			if(input == this.list[i].task && this.list[i].status == "X"){
				this.list[i].status = "✓"
				fs.writeFile('data.json',JSON.stringify(this.list))
				console.log(input + " berhasil di-check!")
				found = 1
			}
		}

		if(found == 0){
				console.log(input + " tidak ditemukan!")
		}
	}

	unchecktask(input){
		let found = 0

		for(let i=0; i<this.list.length;i++){
			if(input == this.list[i].task && this.list[i].status != "X"){
				this.list[i].status = "X"
				fs.writeFile('data.json',JSON.stringify(this.list))
				console.log(input + " berhasil di-uncheck!")
				found = 1
			}
		}

		if(found == 0){
				console.log(input + " tidak ditemukan!")
		}
	}

	displaymenu(){
		console.log("Welcome to To-Do-List Program! Here's Your List:")
		this.tasklist()
		console.log("==================================================")
		console.log("1. Add Task - node todo.js add <task-name>")
		console.log("2. Delete Task - node todo.js delete <task-name>")
		console.log("3. Check Task - node todo.js check <task-name>")
		console.log("4. Uncheck Task - node todo.js uncheck <task-name>")
	}

	start(){
		switch (process.argv[2]) {
			case "add":
				this.addtask(process.argv[3])
				break
			case "delete":
			 	this.deletetask(process.argv[3])
				break
			case "check":
				this.checktask(process.argv[3])
				break
			case "uncheck":
				this.unchecktask(process.argv[3])
				break
			default:
				this.displaymenu()
				break
		}
	}
}

let todolist = new Program
todolist.start()
