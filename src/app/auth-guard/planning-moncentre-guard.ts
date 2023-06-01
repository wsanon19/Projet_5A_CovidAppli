import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from '../authentification/authentification.service';
import { RoleService } from '../role/role-service';

@Injectable({
  providedIn: 'root'
})
export class PlanningMonCentreGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthentificationService,private roleService : RoleService) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

       //recupere le role de l'utilisateur
       this.roleService.isAdmin();
       this.roleService.isMedecin();



       if(!this.roleService.isUserLoggedIn()) return false;

       if(this.testAdmin() || this.testMedecin()) {return true;}

       else {
           this.router.navigate(['access-denied']);
           return false;
       }
 
  
    }

    


    testAdmin(): boolean {
        var role = localStorage.getItem('role');
        if (role==='ADMINISTRATEUR') return true;
        else return false;
        }

    testMedecin(): boolean {
        var role = localStorage.getItem('role');
        if (role==='MEDECIN') return true;
        else return false;
        }

}