import { inject, Injectable, Signal, signal } from '@angular/core';
import { TodoApiService } from '../api/todo-api.service';
import { Todo } from '../domain/todo/todo';

@Injectable()
export class TodoDetailService {
  private readonly todoApi = inject(TodoApiService);
  private readonly todoSignal = signal<Todo | null>(null);

  get $todo(): Signal<Todo | null> {
    return this.todoSignal.asReadonly();
  }

  fetch(id: number): void {
    this.todoApi.get(id).subscribe((todo) => {
      this.todoSignal.set(todo);
    });
  }
}
