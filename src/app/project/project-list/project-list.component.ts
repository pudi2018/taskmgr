import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { listAnimation } from 'src/app/animat/list.anim';
import { slideToRight } from 'src/app/animat/router.anim';
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
  projects = [
    {
      id: 1,
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
  ];
  constructor(private dialog: MatDialog) {}

  @HostBinding('@routerAnim') state;
  ngOnInit() {}
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
      }];
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
