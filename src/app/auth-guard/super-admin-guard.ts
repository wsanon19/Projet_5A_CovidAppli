import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';
import { RoleService } from '../role/role-service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthentificationService,private roleService : RoleService) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        this.roleService.isSuperAdmin();

        return true;
 
  
    }


}