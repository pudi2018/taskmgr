import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { concat, Observable } from 'rxjs';
import { map, mapTo, reduce } from 'rxjs/operators';

import { Project, TaskList } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private readonly domain = 'taskLists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  // post
  add(project: Project): Observable<TaskList> {
    project.id = null;
    const url = `${this.config.url}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify(project), { headers: this.headers })
      .pipe(map((res) => res.json()));
  }

  update(taskList: TaskList): Observable<TaskList> {
    const url = `${this.config.url}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name,
    };
    return this.http
      .post(url, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map((res) => res.json()));
  }
  delete(taskList: TaskList): Observable<TaskList> {
    const url = `${this.config.url}/taskLists/${taskList.id}`;
    return this.http.delete(url).pipe(
      mapTo(taskList)
    );
  }

  get(projectId: string): Observable<TaskList[]> {
    const url = `${this.config.url}/${this.domain}`;
    return this.http
      .get(url, {params: {projectId}})
      .pipe(map((res) => res.json() as TaskList[]));
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUrl = `${this.config.url}/${this.domain}/${src.id}`;
    const dropUrl = `${this.config.url}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dropUrl, JSON.stringify({order: src.order}), {headers: this.headers})
      .pipe(map((res => res.json())));
    const drop$ = this.http
      .patch(dropUrl, JSON.stringify({order: src.order}), {headers: this.headers})
      .pipe(map((res => res.json())));
    return concat(drag$, drop$).pipe(
      reduce((arrs, list) => [...arrs, list], [])
    );
  }
}
