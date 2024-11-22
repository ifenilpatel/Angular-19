import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  // Private Subject to emit change notifications
  private changeSubject = new Subject<any>();

  constructor() {}

  // Method to notify about a change (emit data)
  notifyChange(data: any): void {
    this.changeSubject.next(data);
  }

  // Method to get the Observable to subscribe to change notifications
  changeObservable() {
    return this.changeSubject.asObservable();
  }
}
