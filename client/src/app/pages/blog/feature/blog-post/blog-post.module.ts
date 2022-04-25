import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';



@NgModule({
  declarations: [
    BlogPostComponent
  ],
  imports: [
    BlogPostRoutingModule,
    CommonModule,
    HeaderModule,
    MarkdownModule.forChild(),
  ]
})
export class BlogPostModule { }
