import { DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailCentreComponent } from '../detail-centre/detail-centre.component';
import { covid } from '../interfaceCovid';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';

@Component({
  selector: 'app-formulaire-reservation',
  templateUrl: './formulaire-reservation.component.html',
  styleUrls: ['./formulaire-reservation.component.css']
})
export class FormulaireReservationComponent implements OnInit {

  constructor(public personnel: personnelService,
    public dialogRef: DialogRef<DetailCentreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {center: covid}) {

      this.centre=data.center;

    }

  ngOnInit(): void {
  }

  centre: covid;

  onSubmit() {
    this.personnel.adReservationToCentre(this.personnel.patientForm.value,this.centre.id); 
    this.onClose();
  }

  onClose() {
    this.personnel.patientForm.reset();
    this.personnel.initialisePatientForm();
    this.dialogRef.close();
  }
}
