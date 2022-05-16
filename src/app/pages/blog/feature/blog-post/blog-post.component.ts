import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  article: any;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticleBySlug();
  }

  getArticleBySlug(): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      if (response && response.article && response.article.data) {
        this.article = response.article?.data[0].attributes.content;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
