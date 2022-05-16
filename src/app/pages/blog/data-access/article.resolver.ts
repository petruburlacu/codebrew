import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BlogService } from "./blog.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class ArticleResolver implements Resolve<any>{

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private blogService:BlogService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
      const data =  this.blogService.getArticle(route.params['slug']);
      console.log('resolver', data);
      return data;
    } else {
      return null;
    }
  }

}