import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { cardAnim } from 'src/app/animat/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item: any = {};
  @Output() invite = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

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
