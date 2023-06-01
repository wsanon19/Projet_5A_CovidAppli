import { Component, OnInit } from '@angular/core';
import { centreService } from '../affichage-des-centres/affichage-des-centres.service';
import { DialogRef } from '@angular/cdk/dialog';
import { isNull } from 'lodash';

@Component({
  selector: 'app-detail-centre',
  templateUrl: './detail-centre.component.html',
  styleUrls: ['./detail-centre.component.css']
})
export class DetailCentreComponent implements OnInit {

  constructor(public centreService:centreService,
    public dialogRef: DialogRef<DetailCentreComponent>) { }

  ngOnInit(): void {
  }

  onClear() {
    this.centreService.form.reset();
    this.centreService.initializeFormGroup();
  }

  onSubmit() {
    if( this.centreService.form.value.id) {
        console.log(this.centreService.form.value);
        this.centreService.updateCentre(this.centreService.form.value,this.centreService.form.value.id);
        this.centreService.form.reset();
        this.centreService.initializeFormGroup();
        this.onClose();
    }
    else
      this.centreService.addNewCentre(this.centreService.form.value); 
      this.onClose();
  }

  onClose() {
    this.centreService.form.reset();
    this.centreService.initializeFormGroup();
    this.dialogRef.close();
  }
}
