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
    const articleId: string = this.getArticleId();
    this.getArticleById(articleId);
  }

  getArticleId(): string {
    return this.route.snapshot.params['id'];
  }

  getArticleById(articleId: string): void {
    this.blogService.getArticle(articleId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.article = response.data.attributes.content;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
