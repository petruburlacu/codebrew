import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/feature/home.module').then(m => m.HomeModule) },
  { path: 'blog', loadChildren: () => import('./pages/blog/feature/blog-shell/blog-shell.module').then(m => m.BlogShellModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
