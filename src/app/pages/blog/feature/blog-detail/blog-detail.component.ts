import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SeoService } from 'src/app/shared/data-access/seo.service';
import { BlogService } from '../../data-access/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  title: string = 'Codebrew Articles';
  description: string = 'List of all articles available on codebrew. Angular Universal Tutorials and more.';
  keywords: string[] = ['angular', 'universal', 'ssr', 'guides', 'tutorials', 'blog'];

  blogPosts: any;

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private blogService: BlogService, private seo: SeoService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.blogService.getArticles().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.blogPosts = response.data;
      this.seo.setSEO(this.title, this.description, this.keywords);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
