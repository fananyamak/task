
import { TaskService } from '../task.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  @Input() newTask: string = '';
  @Output() newTaskChange = new EventEmitter<string>();



  onInputChange(): void {

    this.newTaskChange.emit(this.newTask);
  }
  @Input() selectedTab: string = 'all';
  @Output() addTask: EventEmitter<any> = new EventEmitter<any>();

  @Output() onTabChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearList: EventEmitter<any> = new EventEmitter<any>();

  constructor(private taskService: TaskService) { }

}
