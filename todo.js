class Menu {
	static addTask(){

	}

	static deleteTask(){

	}

	static displayTask(){

	}
}

class Task {
	constructor(input){
		this._status = " "
		this._namaTask = ||"default: Masukan nama task"
	}

	completeTask(){
		this._status = "x"
	}

	uncompleteTask(){
		this._status = " "
	}
}

class KumpulanTask{
	constructor(){
		this._kumpulan = []
	}

	addTask(input){
		this._kumpulan.push(new Task(input))
	}
}

new todoku = new KumpulanTask()
