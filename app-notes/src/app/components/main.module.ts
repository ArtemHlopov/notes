import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteComponent } from './note/note.component';

import { NoteListComponent } from './note-list/note-list.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NoteComponent, NoteListComponent, NewNoteComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [NoteListComponent],
})
export class MainModule {}
