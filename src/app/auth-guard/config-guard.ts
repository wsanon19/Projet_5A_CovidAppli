import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';
import { RoleService } from '../role/role-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthentificationService,private roleService : RoleService) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        //recupere le role de l'utilisateur
        this.roleService.isSuperAdmin();

        if(this.testSuperAdmin()) return true;

        else {
            this.router.navigate(['access-denied']);
            return false;
        }
 
  
    }


    testSuperAdmin(): boolean {
        var role = localStorage.getItem('role');
        if (role==='SUPERADMINISTRATEUR') return true;
        else return false;
        }

}