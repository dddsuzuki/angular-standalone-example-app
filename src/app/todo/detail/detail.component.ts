import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoDetailService } from './detail.service';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  providers: [TodoDetailService],
  templateUrl: './detail.component.html',
})
export class TodoDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly todoDetailService = inject(TodoDetailService);

  todo$ = this.todoDetailService.todo$;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged())
      .subscribe((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id')!);
        this.todoDetailService.fetch(id);
      });
  }
}
