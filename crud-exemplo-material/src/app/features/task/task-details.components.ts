import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    inject,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatTableModule } from '@angular/material/table';
  import { TaskService } from './task.service';
  import { ActivatedRoute, Router, RouterLink } from '@angular/router';
  import { MatDividerModule } from '@angular/material/divider';
  import { Task } from './task.model';
  import { MatTooltipModule } from '@angular/material/tooltip';
  import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
  } from '@angular/material/dialog';
  import { first } from 'rxjs/operators';
import { UserService } from '../users/user.service';
import { AddTaskComponent } from './add-task.components';
  
  @Component({
    selector: 'app-task-details',
    standalone: true,
    imports: [
      CommonModule,
      RouterLink,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatDividerModule,
      MatTooltipModule,
      MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './task-details.components.html',
    styleUrl: './task-details.components.css'
  })
  export class TaskDetailsComponent implements OnInit {
    public displayedColumns = ['id', 'name', 'description', 'completed'];
  
    public fullColumns = [
      'id',
      'name',
      'description',
      'completed',
      'status',
      'delete',
    ];
  
    public selecterUserId!: number;
  
    public userService = inject(UserService);
  
    public route = inject(ActivatedRoute);
  
    public router = inject(Router);
  
    public taskService = inject(TaskService);
  
    public _dialog = inject(MatDialog);
  
    public _dialogRef = inject(MatDialogRef<AddTaskComponent>);
  
    public userTasks = this.taskService.userTasks;
  
    public userTotalTasks = this.taskService.userTotalTasks;
  
    public selectedUserName = this.userService.selectedUserName;
  
    public ngOnInit(): void {
      this.selecterUserId = +this.route.snapshot.paramMap.get('id')!;
  
      if (this.selecterUserId) {
        this.userService.setSelectedUserId(this.selecterUserId);
      } else {
        this.router.navigateByUrl('/');
      }
    }
  
    public addNewTask(): void {
      this._dialogRef = this._dialog.open(AddTaskComponent, {
        width: '350px',
        height: 'auto',
        data: this.selecterUserId,
      });
  
      this._dialogRef.componentInstance.confirmClicked
        .pipe(first())
        .subscribe((task: Task) => {
          this.taskService.addTaskStatus(task);
        });
    }
  
    public updteTaskStatus(task: Task, completed: boolean): void {
      this.taskService.updteTaskStatus(task, completed);
    }
  
    public deleteTask(taskId: number): void {
      this.taskService.deleteTask(taskId);
    }
  }