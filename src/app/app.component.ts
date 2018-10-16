import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})
export class AppComponent {
  darkTheme = false;

  switchTheme (darh: boolean) {
    this.darkTheme = darh;
  }
}
