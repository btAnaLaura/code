import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { User } from './user.model';

@Injectable()
export class UserService {
  public http = inject(HttpClient);
  public destroyRef = inject(DestroyRef);

  public userUrl = 'http://localhost:3000/users';

  private users$ = this.http.get<User[]>(this.userUrl);

  public users = toSignal(this.users$, { initialValue: [] as User[] });

  public totalUsersCount = computed(() => this.users().length)

  public selectedUserId = signal(0);

  public userTasks = signal<User[]>([]); //WriteblaSignal

  public selectedUserName = computed(() =>
    this.users().find((user) => user.id === this.selectedUserId())?.name!
  );

  public setSelectedUserId(id: number): void {
    this.selectedUserId.set(id);
  }
  public addUser(newUser: User): void {
    this.http
      .post(this.userUrl, newUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const responseTaks = response as User;
          this.userTasks.update((user) => [...user, responseTaks]);
        },
        //! Error handling
      });
  }

  public updteTaskStatus(user: User, completed: boolean): void {
    const completedTask = {
      ...user,
      completed: completed,
    };

    this.http
      .put(this.users + '/' + user.id, completedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userTasks.update((user) =>
            user.map((_user) => (_user.id === _user.id ? completedTask : _user))
          );
        },
        //! Error handling
      });
  }

  public deleteTask(taskId: number): void {
    this.http
      .delete(this.userUrl + '/' + taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userTasks.update((tasks) =>
            tasks.filter((task) => task.id !== taskId)
          );
        },
        //! Error handling
      });
  }
}