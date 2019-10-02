import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Post } from './model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  posts= [];
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get<Post[]>(this.postsUrl).pipe(map(a => a))
  }

  getPostById(payload: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${payload}`);
  }
}
