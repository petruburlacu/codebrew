import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blog-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _blogPosts = 'blog-posts';

  constructor(private http: HttpClient) { }

  getBlogPosts() {
    return this.http.get<BlogPost[]>(environment.apiUrl + this._blogPosts);
  }
}
