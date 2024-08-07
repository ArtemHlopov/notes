import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { INote, SortName } from '../components/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly dataSubject: BehaviorSubject<INote[]>;
  data$: Observable<INote[]>;
  constructor(private readonly router: Router) {
    this.dataSubject = new BehaviorSubject<INote[]>(this.getDataFromLS());
    this.data$ = this.dataSubject.asObservable();
  }

  createNote(note: INote): void {
    this.dataSubject.next([...this.dataSubject.value, note]);
    this.setDataToLS();
  }
  getDataFromLS(): INote[] {
    const data = localStorage.getItem('notes');
    return data ? JSON.parse(data) : [];
  }
  setDataToLS(): void {
    localStorage.setItem('notes', JSON.stringify(this.dataSubject.value));
  }
  sortDataByDate(str: string): void {
    this.dataSubject.next(
      this.dataSubject.value.sort((a, b) => {
        const first = new Date(a.date).getTime();
        const second = new Date(b.date).getTime();
        return str === SortName.new ? second - first : first - second;
      })
    );
  }
  getNoteDate(str: string): Observable<INote | undefined> {
    return this.data$.pipe(map((data) => data.find((el) => el.id === str)));
  }
  removeNote(id: string): void {
    const confirm = window.confirm('Delete note?');
    if (confirm) {
      this.dataSubject.next(
        this.dataSubject.value.filter((note) => note.id !== id)
      );
      this.setDataToLS();
      this.router.navigate(['main']);
    }
  }
  updateData(id: string, title: string, descr: string): void {
    this.dataSubject.next(
      this.dataSubject.value.map((note) => {
        if (note.id === id) {
          return { ...note, title: title, description: descr };
        } else {
          return note;
        }
      })
    );
    this.setDataToLS();
  }
  findNotes(str: string): void {
    if (str) {
      this.data$ = this.data$.pipe(
        map((data) =>
          data.filter(
            (note) => note.title.includes(str) || note.description.includes(str)
          )
        )
      );
    } else {
      this.data$ = this.dataSubject.asObservable();
    }
  }
}
