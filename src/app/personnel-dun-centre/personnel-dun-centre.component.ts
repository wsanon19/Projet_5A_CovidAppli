import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { infoServiceAdmin } from '../informations-sur-admin/information-sur-admin.service';
import { InformationsSurAdminComponent } from '../informations-sur-admin/informations-sur-admin.component';
import { InformationsSurLutilisateurComponent } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.component';
import { infoService } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.service';
import { client } from '../interfaceClient';
import { covid } from '../interfaceCovid';
import { personnelService } from './personnel-dun-centre.service';

@Component({
  selector: 'app-personnel-dun-centre',
  templateUrl: './personnel-dun-centre.component.html',
  styleUrls: ['./personnel-dun-centre.component.css']
})
export class PersonnelDunCentreComponent implements OnInit {

  constructor(public personnelService:personnelService,
    private dialog: MatDialog,
    public dialogRef: DialogRef<PersonnelDunCentreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {center: covid}) {

      this.centre=data.center;

    }

  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  listeAdmins: client[] = [];
  listeMedecins: client[] = [];
  centre!: covid;

  ngOnInit(): void {
    this.personnelService.getAdminByCentre(this.centre.id).subscribe(
      (listeAdmins : client []) => {
        this.listeAdmins = listeAdmins;
        this.listData = new MatTableDataSource(this.listeAdmins);
      },

    );
    this.personnelService.getMedecinsByCentre(this.centre.id).subscribe(
    (listeMedecins : client []) => {
        this.listeMedecins = listeMedecins;
        this.listData = new MatTableDataSource(this.listeMedecins);
      },
    );
  }

  onDeleteMedecin(id:any){
    this.personnelService.deleteMedecin(id);
  }

  onDeleteAdmin(id:any){
    this.personnelService.deleteAdmin(id);
  }

  onEditMedecin(element:any){
    this.personnelService.populateForm(element);
    this.dialog.open(InformationsSurLutilisateurComponent,{data: {center:this.centre} ,width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  onEditAdmin(element:any){
    this.personnelService.populateForm(element);
    this.dialog.open(InformationsSurAdminComponent,{data: {center:this.centre} ,width:'50%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  setcentre(acentre:covid):void {
    this.centre = acentre;
  }

  onClose() {
    this.personnelService.formPersonnel.reset();
    this.personnelService.initializePersonnelFormGroup();
    this.dialogRef.close();
  }

  onViewAdmin() {
    this.personnelService.initializeUserFormGroup;
    this.dialog.open(InformationsSurAdminComponent,{data: {center:this.centre} ,width:'40%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

  onViewMedecin() {
    this.personnelService.initializeUserFormGroup;
    this.dialog.open(InformationsSurLutilisateurComponent,{data: {center:this.centre} ,width:'40%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

}
