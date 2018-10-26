import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { from, Observable } from 'rxjs';
import { count, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

import { Project } from '../domain';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  // post
  add(project: Project): Observable<Project> {
    project.id = null;
    const url = `${this.config.url}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify(project), { headers: this.headers })
      .pipe(map((res) => res.json()));
  }

  update(project: Project): Observable<Project> {
    const url = `${this.config.url}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http
      .post(url, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map((res) => res.json()));
  }
  delete(project: Project): Observable<Project> {
    const delTasks$ = from(project.taskLists).pipe(
      mergeMap((listId) =>
        this.http.delete(`${this.config.url}/taskLists/${listId}`)
      ),
      count()
    );
    return delTasks$.pipe(
      switchMap(_ => this.http.delete(`${this.config.url}/${this.domain}/${project.id}`)),
      mapTo(project)
    );
  }

  get(userId: string): Observable<Project[]> {
    const url = `${this.config.url}/${this.domain}`;
    return this.http
      .get(url, {params: {'members_like': userId}})
      .pipe(map((res) => res.json() as Project[]));
  }
}
