import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, take, tap } from 'rxjs';
import { Constants } from 'src/app/shared/model/constants';
import { AuthenticationService } from '../../authentication/data-access/authentication.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private DASHBOARD_URL = Constants.API_URL + '/favourites';
  constructor(private authService: AuthenticationService) {}

  public getFavorites(): Observable<string[] | undefined> {
    return this.authService.getAuthenticatedUser().pipe(
      map((user) => {
        if (user) {
          return user.favourites;
        } else {
          return [];
        }
      })
    );
  }

  // public addToFavorites(id: string): Observable<boolean> {
  //   return this.authService.isAuthenticated().pipe(
  //     take(1),
  //     mergeMap((isLoggedIn) => {
  //       if (isLoggedIn) {
  //         return this.http
  //           .post<User>(`${this.DASHBOARD_URL}/${id}`, {
  //             withCredentials: true
  //           })
  //           .pipe(
  //             catchError(() => of(null)),
  //             tap((user) => this.currentUser$.next(user)),
  //             map((user) => !!user)
  //           );
  //       } else {
  //         this.redirectUrl = 'products';
  //         this.redirectParams = { pid: id };
  //         this.router.navigate(['login']);
  //         return of(false);
  //       }
  //     })
  //   );
  // }
}
