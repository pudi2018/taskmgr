import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingModule } from './task.routing.module';

@NgModule({
  imports: [SharedModule, TaskRoutingModule],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHeaderComponent,
    NewTaskComponent,
    CopyTaskComponent,
  ],
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent,
  ]
})
export class TaskModule {}
