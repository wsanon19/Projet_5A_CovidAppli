import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { covid } from "../interfaceCovid";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { client } from "../interfaceClient";

@Injectable({
    providedIn: 'root'
})

export class infoSuperAdminService {

    private readonly SUPERADMIN_URL = environment.host;

    constructor(private http: HttpClient){}

    UserForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      mail: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl({value:'', disabled: true }),
      centreName: new FormControl({value:'', disabled: true })
    });
  
    initializeUserFormGroup() {
      this.UserForm.setValue({
        id: null,
        nom: '',
        prenom: '',
        mail: '',
        password: '',
        role: '',
        centreName: ''
      });
    }

    populateForm(element:any) {
      this.UserForm.setValue({
        id: element.id,
        nom: element.nom,
        prenom: element.prenom,
        mail: element.mail,
        password: element.password,
        role: element.role,
        centreName: ''
      })
    }

    public adSuperAdmin = (element:any) =>{
        const superAdminstr = JSON.stringify(element,null,2);
        const superAdminJson = JSON.parse(superAdminstr);
    
        console.log(superAdminstr)
        this.http.post(`${this.SUPERADMIN_URL}/superAdmin/save`, superAdminJson).subscribe({
          error: (err) => {  
            console.error(err) 
          },
    
          complete: () => console.info('superAdmin saved successful')
    
        });
      }

      public updateSuperAdmin = (element:any, id:number) =>{
        const superAdminstr = JSON.stringify(element,null,2);
        const superAdminJson = JSON.parse(superAdminstr);
    
        this.http.post(`${this.SUPERADMIN_URL}/superAdmin/modify/${id}`, superAdminJson).subscribe({
          error: (err) => {  
            console.error(err) 
          },
    
          complete: () => console.info('superAdmin updated successful')
    
        });
      }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
}