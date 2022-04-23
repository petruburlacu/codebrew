import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';



@NgModule({
  declarations: [
    BlogPostComponent
  ],
  imports: [
    BlogPostRoutingModule,
    CommonModule
  ]
})
export class BlogPostModule { }
