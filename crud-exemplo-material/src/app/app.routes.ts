import { Routes } from '@angular/router';
import { UsersListComponent } from './features/users/users-list-components';
import { TaskDetailsComponent } from './features/task/task-details.components';

export const routes: Routes = [
  { path: "", pathMatch: 'full', component: UsersListComponent },
  { path: "tasks/:id", component: TaskDetailsComponent },
];