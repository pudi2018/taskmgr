import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';

import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    id: '1',
    cn:
      '被击垮通常只是暂时的，但如果你放弃的话，就会使它成为永恒。（Marilyn vos Savant）',
    en:
      'Being defeated is often a temporary condition. Giving up is what makes it permanent.',
    pic: '/assets/img/quotes/1.jpg'
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe((q) => (this.quote = q));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required, this.validate]],
      password: ['', Validators.required]
    });
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    // this.form.controls['email'].setValidators(this.validate);
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotVaild: 'The email must start with wang'
    };
  }
}
