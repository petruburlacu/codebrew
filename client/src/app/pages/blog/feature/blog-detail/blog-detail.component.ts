import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../data-access/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  blogPosts: any;

  article: any;

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getArticles().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.blogPosts = response.data;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
