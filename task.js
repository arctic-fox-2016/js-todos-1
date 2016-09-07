class Task {
  constructor(tasks) {
    this.id = tasks['id']
    this.status = " "
    this.desc = tasks ['desc']
    this.createdAt = tasks['createdAt']
    this.lastUpdate = tasks['lastUpdate']
  }
}
export default Task
