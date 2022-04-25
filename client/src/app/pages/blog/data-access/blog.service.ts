import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';
import { BlogPost } from '../models/blog-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _blogPosts = 'api/blog-posts';
  private _articles = 'api/articles';

  constructor(private http: HttpClient) { }

  getBlogPosts() {
    return this.http.get<BlogPost[]>(environment.apiUrl + this._blogPosts);
  }

  getArticles() {
    return this.http.get<Article[]>(environment.apiUrl + this._articles);
  }

  getArticle() {
    return this.http.get<Article>(environment.apiUrl + this._articles + '/1');
  }
}
