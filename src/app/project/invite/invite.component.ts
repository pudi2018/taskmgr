import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'zhangsan'
    },
    {
      id: 1,
      name: 'lisi'
    },
    {
      id: 1,
      name: 'xiaoming'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }
}
