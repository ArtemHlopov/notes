import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { INote } from '../models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css',
})
export class NewNoteComponent {
  protected readonly newNoteForm = this.fb.group({
    title: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: DataService
  ) {}
  onSubmit(): void {
    const newNote: INote = {
      id: this.generateNoteId(),
      title: this.newNoteForm.controls.title.value,
      description: this.newNoteForm.controls.description.value,
      date: this.newNoteForm.controls.date.value,
    };
    if (this.newNoteForm.valid) {
      this.service.createNote(newNote);
    } else {
      alert('Fields are empty or incorrect');
    }
  }
  protected clearForm(): void {
    this.newNoteForm.reset();
  }
  private generateNoteId(): string {
    return Date.now().toString(36) + Math.random().toString(36);
  }
}
