import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { NgZone } from '@angular/core';
// app.component.ts



@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  constructor(private taskService: TaskService, private zone: NgZone) { }
  displayedTasks: { id: number; value: string; check: boolean }[] = [];
  newTask: string = '';
  selectedTab: string = 'all';
  taskid: number = 0;
  ngOnInit(): void {

    this.tasks = this.taskService.getAllTasks();
    this.displayedTasks = this.taskService.getTasks('all');
    const storedTaskId = localStorage.getItem('taskid');
    this.taskid = storedTaskId ? +storedTaskId : 0;

  }

  tasks: { id: number; value: string; check: boolean }[] = [];



  addTask(): void {
    const ttaskid = localStorage.getItem('taskid');
    this.taskid = Number(ttaskid);

    if (this.newTask.trim() !== '') {

      this.tasks.push({ id: this.taskid++, value: this.newTask, check: false });
      localStorage.setItem('taskid', this.taskid.toString());

      this.newTask = '';
      this.updateLocalStorage();
      this.displayedTasks = this.taskService.getTasks('all');


    }




  }


  onTabChange(tab: string): void {

    this.displayedTasks = this.taskService.getTasks(tab);


  }


  clearList(): void {
    const userConfirmed = window.confirm('Are you sure you want to delete all tasks?');
    if (userConfirmed) {

      this.tasks = [];
      this.displayedTasks = [];
      this.taskid = 0;
      localStorage.setItem('taskid', this.taskid.toString());
      this.updateLocalStorage();
    }
  }


  updateLocalStorage(): void {

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskService.loadTasksFromLocalStorage();
  }
}
