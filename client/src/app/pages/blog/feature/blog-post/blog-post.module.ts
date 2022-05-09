import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BlogPostComponent
  ],
  imports: [
    BlogPostRoutingModule,
    CommonModule,
    RouterModule,
    HeaderModule,
    MarkdownModule.forChild(),
  ]
})
export class BlogPostModule { }
