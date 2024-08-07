import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder } from '@angular/forms';
import { SortName } from '../models';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent implements OnInit {
  protected readonly searchForm = this.fb.group({
    search: this.fb.control('', { nonNullable: true }),
    sort: this.fb.control('', { nonNullable: true }),
  });
  constructor(
    private readonly fb: FormBuilder,
    readonly service: DataService
  ) {}
  ngOnInit(): void {
    this.searchForm.controls.sort.valueChanges.subscribe((val) =>
      this.sortNotes(val)
    );
    this.searchForm.controls.search.valueChanges.subscribe((val) =>
      this.findNotes(val)
    );
  }
  protected sortNotes(str: string): void {
    this.service.sortDataByDate(str);
  }
  protected findNotes(val: string): void {
    this.service.findNotes(val);
  }
  protected deleteNote(id: string): void {
    this.service.removeNote(id);
  }
}
