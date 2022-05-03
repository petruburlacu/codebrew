import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuardService } from '../../data-access/dashboard-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardGuardService],
    loadChildren: () =>
      import('./../favourites/favourites.module').then(
        (m) => m.FavouritesModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardShellRoutingModule {}