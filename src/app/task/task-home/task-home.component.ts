import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { slideToRight } from 'src/app/animat/router.anim';
import {
  ConfirmDialogComponent,
} from 'src/app/shared/confirm-dialog/confirm-dialog.component';

import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routerAnim')
  state;

  lists = [
    {
      id: 1,
      name: '待办理',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡',
          completed: true,
          priority: 2,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二：完成工作任务',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        },
        {
          id: 3,
          desc: '任务三：整理文档',
          completed: true,
          priority: 3,
          reminder: new Date(),
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二：完成工作任务',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        },
        {
          id: 3,
          desc: '任务三：整理文档',
          completed: false,
          priority: 2,
          reminder: new Date(),
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        }
      ]
    }
  ];
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {
      data: {
        title: '新建任务'
      }
    });
  }
  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: { lists: this.lists }
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        task: task
      }
    });
  }
  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除任务列表',
        content: '您确认删除该任务列表吗？'
      }
    });
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
  launchEditListDialog(title: string) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: title
      }
    });
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('item');
        break;
      case 'task-list':
        console.log('list');
        break;
      default:
        break;
    }
  }
}
