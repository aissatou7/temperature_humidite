import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from './../user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthUserGuard implements CanActivate {
  constructor(
    public UserService: UserService, public router: Router,
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // 
     if (localStorage.getItem('role') === 'Utilisateur'){
        this.router.navigate(['/systeme']);
    }
    return true;
 
  }
  
}
