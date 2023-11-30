import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: { id: number; value: string; check: boolean; } = {
    value: '', check: false,
    id: 0
  };
  showMenu = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private taskService: TaskService) { }




  get tasks(): { id: number; value: string; check: boolean }[] {
    return this.taskService.getTasks('all');
  }

  onCheckboxChange(): void {



    this.taskService.updateTaskCheck(this.task.value, this.task.check);
  }

  onDragStart(): void {
   
  }


  toggleMenu(): void {

    this.showMenu = !this.showMenu;
  }

  completeTask(): void {
    this.taskService.completeTask(this.tasks.indexOf(this.task));

  }

  deleteTask(): void {
    this.taskService.deleteTask(this.tasks.indexOf(this.task));
  }
}
