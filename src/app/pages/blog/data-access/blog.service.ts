import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/model/constants';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _articles = '/articles';
  private _article = '/articles?slug=';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<Article[]>(Constants.API_URL + this._articles);
  }

  getArticle(articleSlug: string) {
    return this.http.get<Article>(Constants.API_URL + this._article + articleSlug);
  }
}
