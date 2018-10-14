import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('square', [
      state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateY(0)'})),
      state('red', style({'background-color': 'red', 'height': '100px', 'transform': 'translateY(100%)'})),
      transition('green => red', animate('.8s cubic-bezier(.11, .67, 1, .58)')), // http://cubic-bezier.com/#.17,.67,.83,.67 动画效果链接
      transition('red => green', animate('.8s ease-out')),
    ])
  ]
})
export class AppComponent {
  squareState: string;
  darkTheme = false;

  switchTheme (darh: boolean) {
    this.darkTheme = darh;
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
