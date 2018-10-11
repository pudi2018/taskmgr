import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * 头像集合
   */
  items: string[] = [];
  constructor() {}

  ngOnInit() {
    for (let i = 1; i < 17; i++) {
      this.items.push(`avatars:svg-${i}`);
    }
  }
}
