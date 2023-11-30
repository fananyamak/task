import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from './task.service';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TaskListComponent,
    TaskItemComponent,
    DragDropDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [DragDropDirective],
  providers: [
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

