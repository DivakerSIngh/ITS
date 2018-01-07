
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  public status: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  set(val: any) {
    this.status.next(val);
  }

  get get() {
    return this.status.asObservable();
  }
}
