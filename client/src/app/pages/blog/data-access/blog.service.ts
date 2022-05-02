import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _articles = 'api/articles';
  private _article = 'api/articles?filters[slug]=';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<Article[]>(environment.apiUrl + this._articles);
  }

  getArticle(articleSlug: string) {
    return this.http.get<Article>(environment.apiUrl + this._article + articleSlug);
  }
}
