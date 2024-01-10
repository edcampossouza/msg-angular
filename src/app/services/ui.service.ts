import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selectedSubject = new BehaviorSubject<string | undefined>(undefined);
  private selected?: string;
  autoScrollSubject = new BehaviorSubject<boolean>(true);
  constructor() {}

  toggleActiveChat(name: string) {
    this.selected = name;
    this.selectedSubject.next(name);
  }

  onSelectChat(): Observable<string | undefined> {
    return this.selectedSubject.asObservable();
  }

  getSelectedChat(): string | undefined {
    return this.selected;
  }

  setAutoScroll(value: boolean) {
    this.autoScrollSubject.next(value);
  }

  onChangeAutoScroll(): Observable<boolean> {
    return this.autoScrollSubject.asObservable();
  }
}
