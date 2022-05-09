import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../../authentication/data-access/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((auth) => {
        if (auth === false) {
          this.authService.setRedirectUrl(state.url);
          this.router.navigate(['/authentication']);
        }
      })
    );
  }
}
