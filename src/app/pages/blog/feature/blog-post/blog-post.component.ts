import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/data-access/seo.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  article: any;
  title: string = '';
  description: string = '';
  author: string = '';
  publishedDate: string = '';
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private seo: SeoService) { }

  ngOnInit(): void {
    this.getArticleBySlug();
  }

  getArticleBySlug(): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      if (response && response.article && response.article.data) {
        this.article = response.article?.data[0].attributes.content;
        this.title = response.article?.data[0].attributes.title;
        this.description = response.article?.data[0].attributes.description;
        this.publishedDate = response.article?.data[0].attributes.publishedDate;
        this.seo.setSEO(this.title, this.description, ['angular', 'universal', 'ssr', 'guides', 'tutorials', 'blog']);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
