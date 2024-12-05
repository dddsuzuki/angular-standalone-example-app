import { Component, inject, OnInit } from '@angular/core';
import { TodoListService } from './list.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, RouterLink],
  providers: [TodoListService],
  templateUrl: './list.component.html',
})
export class TodoListComponent implements OnInit {
  private readonly todoListService = inject(TodoListService);

  todoList$ = this.todoListService.todoList$;

  ngOnInit(): void {
    this.todoListService.fetchList();
  }
}
