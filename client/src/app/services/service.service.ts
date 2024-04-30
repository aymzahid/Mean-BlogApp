import { Globals } from './../global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',

})
export class ServiceService {
  constructor(private http: HttpClient, private globals: Globals) {}

  getAllData(): Observable<Post[]> {
    return this.http.get<Post[]>(this.globals.baseURL);
  }

  //Get Post By Id
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.globals.baseURL + '/' + id);
  }

  //Delete Data By Id
  deletePostById(id: string): Observable<Post> {
    return this.http.delete<Post>(this.globals.baseURL + '/' + id);
  }

  //Create data
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.globals.baseURL, post);
  }

  //Update data
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.globals.baseURL + '/' + post._id, post);
  }
}
