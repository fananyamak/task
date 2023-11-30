import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: { id: number; value: string; check: boolean }[] = [];
  taskIdCounter!: number;
  ngOnInit(): void {

    this.taskIdCounter = 1;
  }

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  getTasks(tab: string): { id: number; value: string; check: boolean }[] {

    if (tab === 'completed') {
      return this.tasks.filter((task) => task.check === true);
    } else if (tab === 'pending') {
      return this.tasks.filter((task) => task.check === false);
    } else {

      return this.tasks;
    }
  }

  getAllTasks(): { id: number; value: string; check: boolean }[] {


    return this.tasks;

  }
  updateTaskCheck(value: string, check: boolean): void {

    const index = this.tasks.findIndex(task => task.value === value);
    if (index !== -1) {

      this.tasks[index].check = check;
      this.updateLocalStorage();
    }
  }
  addTask(newTask: string): void {
    alert("id");
    const task = { id: this.taskIdCounter++, value: newTask, check: false };
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
  }

  completeTask(index: number): void {
    this.tasks[index].check = true;
    this.updateLocalStorage();
  }
  changeTask(index: number): void {
    this.tasks[index].check = !this.tasks[index].check;
    alert(this.tasks[index].check);
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
