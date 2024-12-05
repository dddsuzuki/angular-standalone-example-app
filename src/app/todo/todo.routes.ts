import { Routes } from '@angular/router';
import { TodoListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/detail.component').then((m) => m.TodoDetailComponent),
  },
];
