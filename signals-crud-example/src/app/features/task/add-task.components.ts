import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Task } from './task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-task.components.html',
  styles: [
    `
     
    `,
  ],
})
export class AddTaskComponent {

  @Output()
  public confirmClicked = new EventEmitter<Task>();

  public name = '';

  public description = '';

  public userId = inject(MAT_DIALOG_DATA);

  public confirmSaveTaskHandler(): void {

    const newTask = {
      userId: this.userId,
      name: this.name,
      description: this.description,
      completed: false
    }

    this.confirmClicked.emit(newTask);
  }
}