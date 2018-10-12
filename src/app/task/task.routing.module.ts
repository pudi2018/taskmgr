import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskHomeComponent } from './task-home/task-home.component';

const routes: Routes = [
  {
    path: 'tasklist',
    component: TaskHomeComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
