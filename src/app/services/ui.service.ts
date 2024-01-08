import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selected = new Subject<string>();
  constructor() {}

  toggleActiveChat(name: string) {
    this.selected.next(name);
  }
  
  onSelectChat(): Observable<string> {
    return this.selected.asObservable();
  }
}
