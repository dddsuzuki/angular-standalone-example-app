import { Routes } from '@angular/router';
import { TodoListComponent } from './list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail.component').then((m) => m.TodoDetailComponent),
  },
];
