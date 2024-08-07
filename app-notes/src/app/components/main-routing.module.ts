import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NoteComponent } from './note/note.component';
import { NewNoteComponent } from './new-note/new-note.component';

const routes: Routes = [
  {
    path: ':id',
    component: NoteComponent,
  },
  {
    path: 'add',
    component: NewNoteComponent,
  },
  { path: '', pathMatch: 'full', component: NoteComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
