import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogShellRoutingModule } from './blog-shell-routing.module';



@NgModule({
  declarations: [],
  imports: [
    BlogShellRoutingModule,
    MarkdownModule.forRoot()
  ]
})
export class BlogShellModule { }
