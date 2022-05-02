import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/feature/home.module').then(m => m.HomeModule) },
  { path: 'blog', loadChildren: () => import('./pages/blog/feature/blog-shell/blog-shell.module').then(m => m.BlogShellModule) },
  { path: 'authentication', loadChildren: () => import('./pages/authentication/feature/authentication-shell/authentication-shell.module').then(m => m.AuthenticationShellModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/feature/dashboard-shell/dashboard-shell.module').then(m => m.DashboardShellModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
