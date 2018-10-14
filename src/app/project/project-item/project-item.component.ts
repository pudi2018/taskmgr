import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() item: any = {};
  @Output() invite = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onInviteClick() {
    this.invite.emit();
  }
  onEditClick() {
    this.edit.emit();
  }
  onDelClick() {
    this.delete.emit();
  }
}
