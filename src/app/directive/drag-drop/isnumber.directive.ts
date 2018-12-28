import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[app-isNumber][inputNumber]'
})
export class IsnumberDirective {
  @Input() inputNumber: string;
  constructor(element: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    // console.log(this.inputNumber);
    const e = <KeyboardEvent>event;
    const reg = /^\d*\.{0,1}\d{0,1}$/;
    console.log(e.keyCode);
    // 确保数字以外的案件被拒绝执行默认动作
    // (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
    //   (e.keyCode < 96 || e.keyCode > 105)
    if ( e.keyCode < 96 || e.keyCode > 105 ) {
      console.log(111);
      e.preventDefault();
    }
  }
}
