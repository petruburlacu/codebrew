import { NgModule } from '@angular/core';
import { DashboardGuardService } from '../../data-access/dashboard-guard.service';
import { DashboardShellRoutingModule } from './dashboard-shell-routing.module';


@NgModule({
  declarations: [],
  imports: [
    DashboardShellRoutingModule,
  ],
  providers: [DashboardGuardService]
})
export class DashboardShellModule { }
