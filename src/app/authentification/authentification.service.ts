import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { client } from '../interfaceClient';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  authenticate(user: string, password:string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa((user + ':' + password)) })
    headers.set('Content-Type', 'application/json')
    return this.httpClient.get<client>(environment.host+'/medecin/validateLogin',{headers}).pipe(
     map(
       (       userData: any) => {
        sessionStorage.setItem('username',user);
        let authString = 'Basic ' + btoa(user + ':' + password);
        sessionStorage.setItem('basicauth', authString);
        return userData;
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    let password = sessionStorage.getItem('password')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('user')
    this.router.navigateByUrl('pageaccueil')
  }

  logIn(){
    this.router.navigateByUrl('login')
  }
}
