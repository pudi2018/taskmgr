import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { listAnimation } from 'src/app/animat/list.anim';
import { slideToRight } from 'src/app/animat/router.anim';
import { Project } from 'src/app/domain';
import { ProjectService } from 'src/app/services/project.service';
import {
  ConfirmDialogComponent,
} from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations: [ slideToRight, listAnimation ]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  constructor(private dialog: MatDialog, private service$: ProjectService) {}

  @HostBinding('@routerAnim') state;
  ngOnInit() {
    this.service$.get('1').subscribe(projects => this.projects = projects);
  }
  openNewProjectDialog() {
    // this.dialog.open(NewProjectComponent, {
    //   height: '300px',
    //   width: '300px',
    // });
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {
      dark: true,
      title: '新增项目'
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, {
        id: 3,
        name: '一个新项目',
        desc: '这是一个新项目',
        coverImg: 'assets/img/covers/2.jpg'
      },
      {
        id: 4,
        name: '又一个新项目',
        desc: '这又是一个新项目',
        coverImg: 'assets/img/covers/3.jpg'
      }] as Project[];
    });
  }
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {data: {
      dark: true,
    }});
    dialogRef.afterClosed().subscribe(paramName => {
      console.log(paramName);
    });
  }
  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {
      title: '编辑项目'
    }});
  }
  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: '删除项目',
      content: '您确认删除该项目吗？',
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(item => item.id !== project.id);
    });
  }
}
