import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleResolver } from '../../data-access/article.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../blog-detail/blog-detail.module').then(
        (m) => m.BlogDetailModule
      ),
  },
  {
    path: ':slug',
    loadChildren: () =>
      import('./../blog-post/blog-post.module').then(
        (m) => m.BlogPostModule
      ),
    resolve: {
      article: ArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogShellRoutingModule {}