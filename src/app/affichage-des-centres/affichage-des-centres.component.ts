import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { client } from '../interfaceClient';
import { covid } from '../interfaceCovid';
import { centreService } from './affichage-des-centres.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailCentreComponent } from '../detail-centre/detail-centre.component';
import { AnimationStyleMetadata } from '@angular/animations';
import { PersonnelDunCentreComponent } from '../personnel-dun-centre/personnel-dun-centre.component';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';
import { FormulaireReservationComponent } from '../formulaire-reservation/formulaire-reservation.component';
import { RoleService } from '../role/role-service';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-affichage-des-centres',
  templateUrl: './affichage-des-centres.component.html',
  styleUrls: ['./affichage-des-centres.component.css']
})

export class AffichageDesCentresComponent implements OnInit {

 
  // @Input() center?: covid; 

  // @Output() selected = new EventEmitter<covid>();

  // aclient: client = {
  //   id: 3,
  //   name: "Dupont",
  //   prenom: "Jules",
  //   email: "DupontJules@gmail.com",
  //   Date: new Date()
  // };

  // constructor() { }

  // ngOnInit(): void {
  // }

  // choisir(){ 
  //   this.selected.emit(this.center);
  // }

  public errMsg: string | undefined;
  searchKey:string= " ";

  constructor(private centreService: centreService,
    public personnelService: personnelService,
    private dialog: MatDialog,
    public roleSerice:RoleService,
    public authentification: AuthentificationService) { 
    }

    isSuperAdmin(): boolean {
      var role = localStorage.getItem('role');
      if (role==='SUPERADMINISTRATEUR') return true;
      else return false;
      }


  listeCentres: covid[] = [];
  FilteredCenters: covid[] = []
  // role:string | null = "";

  ngOnchanges(){

  }

  ngOnInit() {

    // this.roleSerice.isSuperAdmin();

    // this.role = localStorage.getItem('role');
    // console.log(localStorage.getItem('role'))



    // this.role = localStorage.getItem('role');

    this.centreService.getCentres().subscribe(
      (listeCentres : covid []) => {
        this.listeCentres = listeCentres;
      },

      //error: err => this.errMsg = err
    );


    // this.centreService.getCentresByName(this.searchKey).subscribe(
    //   (FilteredCenters : covid []) => {
    //     this.FilteredCenters = FilteredCenters;
    //   },

    //   //error: err => this.errMsg = err
    // );
    this.centreService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }



  onCreate(){
    this.centreService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.panelClass = 'bg-color'
    this.dialog.open(DetailCentreComponent,dialogConfig);
  }

  onEdit(element:any){
    this.centreService.populateForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.panelClass = 'bg-color'
    this.dialog.open(DetailCentreComponent,dialogConfig);
  }

  onChoose(element:any){
    this.personnelService.initialisePatientForm();
    this.dialog.open(FormulaireReservationComponent,{data: {center:element} ,width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  onView(element:any) {
    this.personnelService.initializePersonnelFormGroup();
    this.dialog.open(PersonnelDunCentreComponent,{data: {center:element} ,width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  applyFilter(event:any){
    this.searchKey = (event.target as HTMLInputElement).value;
    this.centreService.search.next(this.searchKey);
  }

}
