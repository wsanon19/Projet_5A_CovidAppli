import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { centreService } from '../affichage-des-centres/affichage-des-centres.service';
import { covid } from '../interfaceCovid';
import { reservation } from '../interfaceReservations';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';
import { infoService } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.service';
import { InformationsSurLutilisateurComponent } from '../informations-sur-lutilisateur/informations-sur-lutilisateur.component';
import { AuthentificationService } from '../authentification/authentification.service';
import { client } from '../interfaceClient';
import { RoleService } from '../role/role-service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  constructor(public personnelService:personnelService, public centreService: centreService,
    public authentification: AuthentificationService,
    private dialog: MatDialog,
    public roleService:RoleService) { }

  searchKey:string= " ";
  listData!: MatTableDataSource<any>;
  listeReservations: reservation[] = [];
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  centre!: covid;
  user! : client;

  ngOnInit(): void {

    if(this.roleService.isUserinStorage()){
      this.user = this.roleService.getUseFromLocalCache();

      if(this.user.role==="ADMINISTRATEUR") {

        this.personnelService.getAdminCentre(this.user.id).subscribe(
       
          (center : covid) => {
            this.centre = center;
            this.listeReservations = center.reservations;
            this.listData = new MatTableDataSource(this.listeReservations);
            console.log(center);
          },
        );
  
      }
  
      if(this.user.role==="MEDECIN") {
        
        this.personnelService.getMedecinCentre(this.user.id).subscribe(
       
          (center : covid) => {
            this.centre = center;
            this.listeReservations = center.reservations;
            this.listData = new MatTableDataSource(this.listeReservations);
            console.log(center);
          },
        );
      }
    }



    this.personnelService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
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

  onValidate(element:any) {
    this.personnelService.ValidateStatut(element.id)
  }
}
