import { inject, Injectable, Signal, signal } from '@angular/core';
import { TodoApiService } from '../api/todo-api.service';
import { Todo } from '../domain/todo/todo';

@Injectable()
export class TodoListService {
  private readonly todoApi = inject(TodoApiService);
  private readonly todoListSignal = signal<Todo[]>([]);

  get $todoList(): Signal<Todo[]> {
    return this.todoListSignal.asReadonly();
  }

  fetchList(): void {
    this.todoApi.getList().subscribe((todoList) => {
      this.todoListSignal.set(todoList);
    });
  }
}
