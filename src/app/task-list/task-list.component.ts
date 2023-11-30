import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() displayedTasks: { id: number; value: string; check: boolean }[] = [];

  constructor(private taskService: TaskService) { }

  tasks = this.taskService.getTasks('all');
  onMouseOver(taskId: Number): void {
    alert(taskId);
  }

}
