import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from './../user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public UserService: UserService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.UserService.isLoggedIn !== true && localStorage.getItem('token') == null) {
  
Swal.fire('Veuillez-vous connecter !')
      this.router.navigate([''])
    }
    return true;
  }
}