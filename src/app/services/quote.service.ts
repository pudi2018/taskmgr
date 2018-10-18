import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quote } from '../domain/quote.model';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http
  ) {}

  getQuote(): Observable<Quote> {
    const url = `${this.config.url}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(url).pipe(
      // debug('quote:'),
      map(res => res.json() as Quote)
    );
  }
}
