import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { client } from "../interfaceClient";
import { covid } from "../interfaceCovid";
import { reservation } from "../interfaceReservations";

@Injectable({
    providedIn: 'root'
})

export class personnelService {

    private readonly PERSONNEL_API_URL = environment.host;

    constructor(private http: HttpClient){}

    public search = new BehaviorSubject<string>("");
    
    formPersonnel: FormGroup = new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(''),
    })

    initializePersonnelFormGroup() {
      this.formPersonnel.setValue({
        id: null,
        nom: '',
      })
    }

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

    patientForm: FormGroup = new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      mail: new FormControl(''),
      date: new FormControl('')
    })

    initialisePatientForm(){
      this.patientForm.setValue({
        id: null,
        nom: '',
        prenom: '',
        mail: '',
        date: ''
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
    
    public getAdminByCentre(id:number): Observable<client[]> {
        return this.http.get<client[]>(`${this.PERSONNEL_API_URL}/centre/admins/${id}`).pipe(
          tap(unCentre => console.log('admin: ', unCentre)),
          catchError(this.handleError)
      );
    }

    public getMedecinsByCentre(id:number): Observable<client[]> {
      return this.http.get<client[]>(`${this.PERSONNEL_API_URL}/centre/medecins/${id}`).pipe(
        tap(unCentre => console.log('medecin: ', unCentre)),
        catchError(this.handleError)
      )
    }

    public getMedecins(): Observable<client[]> {
      return this.http.get<client[]>(`${this.PERSONNEL_API_URL}/medecin/list`).pipe(
        tap(unMedecin => console.log('medecin: ', unMedecin)),
        catchError(this.handleError)
      )
    }

    public getSuperAdmins(): Observable<client[]> {
      return this.http.get<client[]>(`${this.PERSONNEL_API_URL}/superAdmin/list`).pipe(
        tap(unSuperAdmin => console.log('superAdmin: ', unSuperAdmin)),
        catchError(this.handleError)
      )
    }

    public getReservations(): Observable<reservation[]> {
      return this.http.get<reservation[]>(`${this.PERSONNEL_API_URL}/reservations/list`).pipe(
        tap(uneReservation => console.log('reservation: ', uneReservation)),
        catchError(this.handleError)
      )
    }

    public deleteMedecin = (id:number) =>{
      this.http.delete(`${this.PERSONNEL_API_URL}/medecin/delete/${id}`).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('medecin deleted successful')
  
      });
    }

    public deleteAdmin = (id:number) =>{
      this.http.delete(`${this.PERSONNEL_API_URL}/admin/delete/${id}`).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('admin deleted successful')
  
      });
    }

    public deleteSuperAdmin = (id:number) =>{
      this.http.delete(`${this.PERSONNEL_API_URL}/superAdmin/delete/${id}`).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('superAdmin deleted successful')
  
      });
    }

    public adReservationToCentre = (element:any,id:number) =>{
      const reservationstr = JSON.stringify(element,null,2);
      const reservationsJson = JSON.parse(reservationstr);
  
      console.log(reservationstr);
      this.http.post(`${this.PERSONNEL_API_URL}/reservations/save/${id}`, reservationsJson).subscribe({
        error: (err) => {  
          console.error(err) 
        },
  
        complete: () => console.info('reservation saved successful')
  
      });
    }

    public getAdminCentre(id:number): Observable<covid> {
      return this.http.get<covid>(`${this.PERSONNEL_API_URL}/admin/centre/${id}`).pipe(
        tap(centre => console.log('centre de l admin: ', centre)),
        catchError(this.handleError)
      )
    }


    public getMedecinCentre(id:number): Observable<covid> {
      return this.http.get<covid>(`${this.PERSONNEL_API_URL}/medecin/centre/${id}`).pipe(
        tap(centre => console.log('centre du medecin: ', centre)),
        catchError(this.handleError)
      )
    }

    public ValidateStatut(id:number): Observable<boolean> {
      return this.http.get<boolean>(`${this.PERSONNEL_API_URL}/reservations/validate/${id}`).pipe(
        tap(reservation => console.log('statut: ', reservation)),
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
}