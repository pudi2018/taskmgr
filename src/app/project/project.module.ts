import { NgModule } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { SharedModule } from '../shared/shared.module';
import { InviteComponent } from './invite/invite.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project.routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent,
  ],
  providers: [ProjectService]
})
export class ProjectModule { }
