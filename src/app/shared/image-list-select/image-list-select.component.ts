import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true // 令牌是多对一
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input()
  cols = 6;
  @Input()
  rowHeight = '64px';
  @Input()
  title = '选择头像';
  @Input()
  items: string[] = [];
  @Input()
  useSvgIcon = false; // 是否是图片
  @Input()
  itemWidth = '80px';

  selected: string;
  private propagateChange = (_: any) => {};
  constructor() {}

  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }
  /**
   * 写入控件的值
   */
  writeValue(obj: any): void {
    this.selected = obj;
  }
  /**
   * 值发生变化传给表单
   */
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  /**
   * 是否移上去过表单touched事件
   */
  registerOnTouched(fn: any): void {}

  validate(c: FormControl): { [key: string]: any } {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }
}
