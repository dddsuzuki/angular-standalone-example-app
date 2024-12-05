import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.routes').then((m) => m.routes),
  },
];
