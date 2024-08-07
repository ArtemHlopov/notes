import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './components/note/note.component';
import { NewNoteComponent } from './components/new-note/new-note.component';

const routes: Routes = [
  {
    path: 'main',
    component: NoteComponent,
  },
  {
    path: 'main/:id',
    component: NoteComponent,
  },
  {
    path: 'add',
    component: NewNoteComponent,
  },
  { path: '', pathMatch: 'full', component: NoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
