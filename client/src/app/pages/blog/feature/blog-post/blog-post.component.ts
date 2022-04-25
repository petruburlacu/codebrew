import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../data-access/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  article: any;

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getArticle().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.article = response.data.attributes.content;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
