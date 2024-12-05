import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TodoDetailService } from './detail.service';
import { distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  providers: [TodoDetailService],
  templateUrl: './detail.component.html',
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly todoDetailService = inject(TodoDetailService);

  todo$ = this.todoDetailService.todo$;

  private destroy$ = new EventEmitter<void>();

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id')!);
        this.todoDetailService.fetch(id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
