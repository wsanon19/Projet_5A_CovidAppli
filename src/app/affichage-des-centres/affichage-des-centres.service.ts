import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { covid } from "../interfaceCovid";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class centreService {

    private readonly CENTRE_API_URL = environment.host;

    public search = new BehaviorSubject<string>("");
    
    constructor(private http: HttpClient){}

    form: FormGroup = new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(''),
      adresse: new FormControl(''),
      codePostal: new FormControl(''),
      ville: new FormControl(''),
    });
  
    initializeFormGroup() {
      this.form.setValue({
        id: null,
        nom: '',
        adresse: '',
        codePostal: '',
        ville: '',
      });
    }

    // formUser: FormGroup = new FormGroup({
    //   id: new FormControl(null),
    //   nom: new FormControl(''),
    //   prenom: new FormControl(''),
    //   mail: new FormControl(''),
    //   password: new FormControl(''),
    //   role: new FormControl(''),
    //   centreName: new FormControl('')
    // })

    // initializeUserFormGroup() {
    //   this.form.setValue({
    //     id: null,
    //     nom: '',
    //     prenom: '',
    //     mail: '',
    //     password: '',
    //     role: '',
    //     centreName: ''
    //   })
    // }
    
    public getCentres(): Observable<covid[]> {
        return this.http.get<covid[]>(`${this.CENTRE_API_URL}/centre/list`).pipe(
          tap(unCentre => console.log('centres: ', unCentre)),
          catchError(this.handleError)
      );
    }

    public getCentresByName(nom:string): Observable<covid[]> {
      return this.http.get<covid[]>(`${this.CENTRE_API_URL}/centre/list/nom`).pipe(
        tap(unCentre => console.log('centres: ', unCentre)),
        catchError(this.handleError)
      )
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

    public updateCentre = (element:any, id:number) =>{
      const centrestr = JSON.stringify(element,null,2);
      const centreJson = JSON.parse(centrestr);
  
      this.http.post(`${this.CENTRE_API_URL}/centre/modify/${id}`, centreJson).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('save successful')
  
      });
    }

    populateForm(element:any) {
      this.form.setValue({
        id: element.id,
        nom: element.nom,
        adresse: element.adresse,
        codePostal: element.codePostal,
        ville: element.ville,
      })
    }

    public addNewCentre = (centre: any) => {

      const centrestr = JSON.stringify(centre,null,2);
      const centreJson = JSON.parse(centrestr);
  
      this.http.post(`${this.CENTRE_API_URL}/centre/save`, centreJson).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('save successful')
  
      });
  
    }
  
  
}