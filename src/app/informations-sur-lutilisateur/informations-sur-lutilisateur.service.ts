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

export class infoService {

    private readonly UTILISATEUR_URL = environment.host;

    constructor(private http: HttpClient){}

    public adMedecinToCentre = (element:any,id:number) =>{
      const medecinstr = JSON.stringify(element,null,2);
      const medecinJson = JSON.parse(medecinstr);
  
      console.log(medecinstr)
      this.http.post(`${this.UTILISATEUR_URL}/medecin/new/centre/${id}`, medecinJson).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('medecin saved successful')
  
      });
    }

    public updateMedecin = (element:any, id:number) =>{
      const centrestr = JSON.stringify(element,null,2);
      const centreJson = JSON.parse(centrestr);
  
      this.http.post(`${this.UTILISATEUR_URL}/medecin/modify/${id}`, centreJson).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('medecin updated successful')
  
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