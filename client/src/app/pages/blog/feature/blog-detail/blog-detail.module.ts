import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import {  } from 'src/app/shared/ui/header/header.component';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';



@NgModule({
  declarations: [
    BlogDetailComponent
  ],
  imports: [
    BlogDetailRoutingModule,
    CommonModule,
    HeaderModule
  ]
})
export class BlogDetailModule { }
