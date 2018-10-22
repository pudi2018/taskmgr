import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isBefore,
  parse,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { combineLatest, from, merge, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
} from 'rxjs/operators';
import { isValidDate } from 'src/app/utils/date.unit';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true // 令牌是多对一
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  daysTop = 90;
  @Input()
  daysBottom = 0;
  @Input()
  mothsTop = 24;
  @Input()
  monthsBottom = 1;
  @Input()
  yearsTop = 150;
  @Input()
  yearsBottom = 1;
  @Input()
  dateFormat = 'YYYY-MM-DD';
  @Input()
  debounceTime = 500;
  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  sub: Subscription;
  ageUnits = [
    {
      value: AgeUnit.Year,
      label: '岁'
    },
    {
      value: AgeUnit.Month,
      label: '月'
    },
    {
      value: AgeUnit.Day,
      label: '天'
    }
  ];
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group(
        {
          ageNum: [],
          ageUnit: [AgeUnit.Year]
        },
        { validator: this.validateAge('ageNum', 'ageUnit') }
      )
    });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      map((d) => {
        return { date: d, from: 'birthday' };
      }),
      filter((_) => birthday.valid)
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );

    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit: _u });
    }).pipe(
      map((d) => {
        return { date: d, from: 'age' };
      }),
      filter((_) => this.form.get('age').valid)
    );
    const merge$ = merge(birthday$, age$).pipe(filter((_) => this.form.valid));

    this.sub = merge$.subscribe((d) => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageNum.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          console.log(d.date);
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(JSON.stringify(value));
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date)
      ? {
          age: differenceInDays(now, date),
          unit: AgeUnit.Day
        }
      : isBefore(subMonths(now, this.mothsTop), date)
        ? {
            age: differenceInMonths(now, date),
            unit: AgeUnit.Month
          }
        : {
            age: differenceInYears(now, date),
            unit: AgeUnit.Year
          };
  }
  toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year:
        return format(subYears(now, age.age), this.dateFormat);
      case AgeUnit.Month:
        return format(subMonths(now, age.age), this.dateFormat);
      case AgeUnit.Day:
        return format(subDays(now, age.age), this.dateFormat);
      default:
        return null;
    }
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val || isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }
  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val)
      ? null
      : {
          birthdayInvalid: true
        };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year:
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        case AgeUnit.Month:
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.mothsTop;
          break;
        case AgeUnit.Day:
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        default:
          break;
      }
      return result
        ? null
        : {
            ageInvalid: true
          };
    };
  }

  /**
   * 写入控件的值
   */
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.dateFormat);
      this.form.get('birthday').patchValue(format(obj, this.dateFormat));
      const age = this.toAge(date);
      this.form
        .get('age')
        .get('ageNum')
        .patchValue(age.age);
      this.form
        .get('age')
        .get('ageUnit')
        .patchValue(age.unit);
    }
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
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

// 折腾半天的问题是因为age.unit === ageUnit，
// 判断时把ageUnit写成了ageNum找了半天没找到原因
