import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BlogService } from "./blog.service";

@Injectable()
export class ArticleResolver implements Resolve<any>{

  constructor(private blogService:BlogService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.blogService.getArticle(route.params['slug']);
  }

}