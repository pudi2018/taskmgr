import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   * 侧边栏显示隐藏方法
   */
  @Output() toggle = new EventEmitter();

  @Output() toggleDarkTheme = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
}
