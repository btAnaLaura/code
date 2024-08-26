import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { User } from './user.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,MatSelectModule 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
 
export class AddUserComponent {

  @Output()
  public confirmClicked = new EventEmitter<User>();

  public name = '';
  public email = '';
  public userId = inject(MAT_DIALOG_DATA);
  public gender = '';

  public confirmSaveUserHandler(): void {

    const newUser = {
      id: this.userId,
      name: this.name,
      email: this.email,
      gender: this.gender
    }

    this.confirmClicked.emit(newUser);
  }
}