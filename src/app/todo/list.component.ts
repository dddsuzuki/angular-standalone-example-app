import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoListService } from './list.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, RouterLink],
  providers: [TodoListService],
  template: `
    <h3>TODO一覧</h3>
    <ul>
      @for (todo of $todoList(); track $index) {
        <li>
          <span>{{ todo.done ? '✅' : '⏺' }}</span>
          <span style="margin-left: 0.5rem">
            <a [routerLink]="'' + todo.id">{{ todo.content }}</a>
          </span>
        </li>
      }
    </ul>
  `,
})
export class TodoListComponent implements OnInit {
  private readonly todoListService = inject(TodoListService);

  $todoList = this.todoListService.$todoList;

  ngOnInit(): void {
    this.todoListService.fetchList();
  }
}
