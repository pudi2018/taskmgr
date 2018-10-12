import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header: string;
  @Output() newTask = new EventEmitter();
  @Output() moveAll = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onNewTaskClick() {
    this.newTask.emit();
  }
  /**
   * 移除事件
   */
  onMoveAllClick() {
    this.moveAll.emit();
  }
}
