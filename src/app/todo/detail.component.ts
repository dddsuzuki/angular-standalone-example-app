import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { TodoDetailService } from './detail.service';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  providers: [TodoDetailService],
  template: `
    @let todo = $todo();
    @if (todo) {
      <h3>{{ todo.content }}</h3>
      <div>ID: {{ todo.id }}</div>
      <div>内容: {{ todo.content }}</div>
      <div>完了: {{ todo.done ? '✅' : '⏺' }}</div>
    }
  `,
})
export class TodoDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly todoDetailService = inject(TodoDetailService);

  $todo = this.todoDetailService.$todo;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id')!);
        this.todoDetailService.fetch(id);
      });
  }
}
