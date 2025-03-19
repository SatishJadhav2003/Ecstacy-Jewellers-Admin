import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.validateToken().pipe(
      map(res => {
        if (res.status) {
          return true;
        }
        return this.router.createUrlTree(['/login'], { 
          queryParams: { returnUrl: state.url } 
        });
      }),
      catchError((err) => {  // Fix: Wrap UrlTree in of()
        return of(this.router.createUrlTree(['/login'], { 
          queryParams: { returnUrl: state.url } 
        }));
      })
    );
  }

}