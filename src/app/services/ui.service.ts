import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selectedSubject = new Subject<string>();
  private selected?: string;
  constructor() {}

  toggleActiveChat(name: string) {
    this.selected = name;
    this.selectedSubject.next(name);
  }

  onSelectChat(): Observable<string> {
    return this.selectedSubject.asObservable();
  }

  getSelectedChat(): string | undefined {
    return this.selected;
  }
}
