import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, distinctUntilChanged, filter, mergeMap, catchError, Observable, of, tap, map } from 'rxjs';
import { Constants } from 'src/app/shared/model/constants';
import { User } from '../../dashboard/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private AUTH_URL = Constants.API_URL + '/auth';

  private currentUser$: Subject<any> = new BehaviorSubject(null as any);

  private redirectUrl: string = '/';
  private redirectParams: any = null;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUser$.pipe(distinctUntilChanged(), filter((user) => !user), mergeMap(() => this.checkCookie())).subscribe();
  }

  private checkCookie(): Observable<any> {
    return this.http.get<User>(`${this.AUTH_URL}/isAuthenticated`).pipe(
        tap((user) => this.currentUser$.next(user))
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => {
      return user !== null && user !== false;
    }));
  }

  public setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  public login(identifier: string, password: string): void {
    this.http.post<User>(`${this.AUTH_URL}/login`, { identifier, password }).pipe(
      tap((user) => {
        this.currentUser$.next(user);
        if (this.redirectParams) {
          this.router.navigate([this.redirectUrl, this.redirectParams]);
        } else {
          this.router.navigate([this.redirectUrl]);
        }
        this.redirectParams = null;
        this.redirectUrl = '/';
      })
    )
    .subscribe();
  }

  getAuthenticatedUser() {
    return this.currentUser$;
  }
}
