import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../data-access/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  article: any;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const articleSlug: string = this.getArticleSlug();
    this.getArticleBySlug(articleSlug);
  }

  getArticleSlug(): string {
    return this.route.snapshot.params['slug'];
  }

  getArticleBySlug(articleSlug: string): void {
    this.blogService.getArticle(articleSlug).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.article = response.data[0].attributes.content;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
