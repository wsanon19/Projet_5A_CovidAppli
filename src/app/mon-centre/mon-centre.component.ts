import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationsSurLutilisateurComponent } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.component';
import { PersonnelDunCentreComponent } from '../personnel-dun-centre/personnel-dun-centre.component';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';
import { infoService } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.service';
import { covid } from '../interfaceCovid';
import { DialogRef } from '@angular/cdk/dialog';
import { client } from '../interfaceClient';
import { MatTableDataSource } from '@angular/material/table';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-mon-centre',
  templateUrl: './mon-centre.component.html',
  styleUrls: ['./mon-centre.component.css']
})
export class MonCentreComponent implements OnInit {

  constructor(public personnelService:personnelService,
    public authentification: AuthentificationService,
    private dialog: MatDialog) { 
    }

    listData!: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'nom', 'actions'];
    listeAdmins: client[] = [];
    listeMedecins: client[] = [];
    centre!: covid;
  
  ngOnInit(): void {
    this.personnelService.getMedecins().subscribe(
    (listeMedecins : client []) => {
        this.listeMedecins = listeMedecins;
      },
    );
  }

  onDelete(id:any){

  }

  onEdit(row:any){
    
  }

  setcentre(acentre:covid):void {
    this.centre = acentre;
  }

  // onClose() {
  //   this.personnelService.formPersonnel.reset();
  //   this.personnelService.initializePersonnelFormGroup();
  // }

  onViewPersonnel() {
    this.personnelService.initializeUserFormGroup;
    this.dialog.open(InformationsSurLutilisateurComponent,{data: {center:this.centre} ,width:'40%',disableClose:true,autoFocus:true,panelClass:'bg-color'});
  }

}
