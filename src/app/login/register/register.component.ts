import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  /**
   * 头像集合
   */
  items: string[] = [];
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const img = `avatars:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    for (let i = 1; i < 17; i++) {
      this.items.push(`avatars:svg-${i}`);
    }
    this.form = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      avatar: [img],
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
  }
}
