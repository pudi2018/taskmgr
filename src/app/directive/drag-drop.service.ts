import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);
  constructor() { }

  setDragDate(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }
}

export interface DragData {
  tag: string;
  data: any;
}
