import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../models';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  protected data$: Observable<INote | undefined> = new Observable();
  protected isEditable: boolean;
  constructor(
    private readonly service: DataService,
    private readonly route: ActivatedRoute
  ) {
    this.isEditable = false;
    this.route.params.subscribe((param) => {
      this.data$ = this.service.getNoteDate(param['id']);
    });
  }
  protected removeNote(id: string): void {
    this.service.removeNote(id);
  }
  protected editMode(): void {
    this.isEditable = !this.isEditable;
  }
  protected saveData(id: string, title: string, descr: string): void {
    this.service.updateData(id, title, descr);
    this.editMode();
  }
}
