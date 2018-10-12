import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { InviteComponent } from '../invite/invite.component';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: '企业协作平台',
      desc: '这是一个企业内部项目',
      coverImg: 'assets/img/covers/1.jpg'
    },
  ];
  constructor(private dialog: MatDialog) {}

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
    dialogRef.afterClosed().subscribe(paramName => {
      console.log(paramName);
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
}
