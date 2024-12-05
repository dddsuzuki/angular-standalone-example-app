import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { Todo } from '../domain/todo/todo';

const TODO_LIST: Todo[] = [
  {
    id: 1,
    content: '買い物',
    done: false,
  },
  {
    id: 2,
    content: '洗濯',
    done: true,
  },
  {
    id: 3,
    content: '掃除',
    done: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Todo | null> {
    // return this.http.post<Todo>('/api/todo', { ...dto });

    const todo = TODO_LIST.find((item) => item.id === id);

    return timer(0).pipe(map(() => (todo ? todo : null)));
  }

  getList(): Observable<Todo[]> {
    // return this.http.get<Todo[]>('/api/todo');

    return timer(0).pipe(map(() => TODO_LIST));
  }
}
