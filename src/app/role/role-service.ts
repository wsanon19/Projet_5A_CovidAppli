import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { client } from "../interfaceClient";
import { RoleForm } from "./roleForm";



@Injectable({
    providedIn: 'root'
  })
  export class RoleService {
  
    constructor(private httpClient:HttpClient) { }

    isAdmin = () => {
        if(this.isUserLoggedIn()){
        var form : RoleForm = new RoleForm() ;
        form.mail = sessionStorage.getItem('username')??'';
        const formstr = JSON.stringify(form,null,2);
        const roleJson = JSON.parse(formstr);
        this.httpClient.post(environment.host + "/admin/role", roleJson).subscribe(
            data => {

                console.log("Hello Wold")
                if (data===true) {
                    localStorage.setItem('role', 'ADMINISTRATEUR');
                    console.log(localStorage.getItem('role'))
                    this.getUser('admin')
                
                }
                else console.log('Je ne suis pas un Admin')

            }
        )  
        
        }
        else {
            console.log('No user logged in ')
        }
    }

    isSuperAdmin = () => {
        if(this.isUserLoggedIn()){
            var form : RoleForm = new RoleForm() ;
            form.mail = sessionStorage.getItem('username')??'';
            const formstr = JSON.stringify(form,null,2);
            const roleJson = JSON.parse(formstr);
            this.httpClient.post<boolean>(environment.host + "/superAdmin/role", roleJson).subscribe(
                data => {

                    console.log("Hello Wold")
                    if (data===true) {
                        localStorage.setItem('role', 'SUPERADMINISTRATEUR');
                        console.log(localStorage.getItem('role'))
                        this.getUser('superAdmin')
                    
                    }
                    console.log(data)

                }
            )    
        }
        else {
            console.log('No user logged in ')
        }

    }

    isMedecin = () => {
        if(this.isUserLoggedIn()){
            var form : RoleForm = new RoleForm() ;
            form.mail = sessionStorage.getItem('username')??'';
            const formstr = JSON.stringify(form,null,2);
            const roleJson = JSON.parse(formstr);
            this.httpClient.post(environment.host + "/medecin/role", roleJson).subscribe(
                data => {

                    if (data===true) {
                        localStorage.setItem('role', 'MEDECIN');
                        console.log(localStorage.getItem('role'))
                        this.getUser('medecin')
                    
                    }
                    else console.log('Je ne suis pas un Medecin')
    
                }
            )  
            
            
            
            // .pipe(
            //     tap(bool => {
            //         if (bool === true) {
            //             localStorage.setItem('role', 'MEDECIN')
            //             console.log('isMedecin: ', bool)
            //             this.getUser('medecin')
            //         }
            //     return bool})
            //   ) 
        }
        else {
            console.log('No user logged in ')
        }
    }



    isUserLoggedIn() {
      let user = sessionStorage.getItem('username')
      let password = sessionStorage.getItem('password')
      console.log(!(user === null))
      return !(user === null)
    }

    isUserinStorage() {
        let user = localStorage.getItem('user');
        let role = localStorage.getItem('role')
        return !(user === null) && (role !== 'SUPERADMINISTRATEUR')
    }

    getUseFromLocalCache(): client {
        return JSON.parse(localStorage.getItem('user')??'');
    }


    getUser(url:string){
        var form : RoleForm = new RoleForm() ;
        form.mail = sessionStorage.getItem('username')??'';
        const formstr = JSON.stringify(form,null,2);
        const roleJson = JSON.parse(formstr);

        this.httpClient.post(environment.host + `/${url}/list/mail`, roleJson).subscribe(
            user => {

                if (user) {
                    localStorage.setItem('user', JSON.stringify(user))
                    console.log('user: ', localStorage.getItem('user'))
                }
                else console.log('user not found')

            }
        )  
        
        
        // .pipe(
        //     tap(user => {
        //         console.log('je cherche le medecin:', JSON.stringify(user))
        //         if (user) {
        //             localStorage.setItem('user', JSON.stringify(user))
        //             console.log('user: ', localStorage.getItem('user'))
        //             }

        //         else console.log('user not found')
        //     })
        //   ) 
    }
}