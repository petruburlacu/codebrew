import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleResolver } from '../../data-access/article.resolver';
import { BlogShellRoutingModule } from './blog-shell-routing.module';



@NgModule({
  declarations: [],
  imports: [
    BlogShellRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [ ArticleResolver ]
})
export class BlogShellModule { }
