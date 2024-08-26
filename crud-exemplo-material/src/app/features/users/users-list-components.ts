import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {} from '@angular/common/http';
import { UserService } from './user.service';
import { User } from './user.model';
import { first } from 'rxjs';
import { AddUserComponent } from './add-user.component';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSelectModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
    
})
export class UsersListComponent {
  public selecterUserId!: number;
  public userService = inject(UserService);

  public router = inject(Router);

  public displayedColumns = ['id', 'name', 'email', 'gender'];

  public fullColumns = ['id', 'name', 'email', 'gender', 'action' ];

  public users = this.userService.users;

  public totalUsersCount = this.userService.totalUsersCount;
  private _dialogRef: any;
  private _dialog: any;

  public setSelectedUserId(id: number): void {
    this.userService.setSelectedUserId(id);

    this.router.navigateByUrl(`tasks/${id}`);
  }
  public addNewUser(): void {
    this._dialogRef = this._dialog.open(AddUserComponent, {
      width: '350px',
      height: 'auto',
      data: this.selecterUserId,
    });

    this._dialogRef.componentInstance.confirmClicked
      .pipe(first())
      .subscribe((user: User) => {
        this.userService.addUser(user);
      });
  }
}