import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { covid } from '../interfaceCovid';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';
import { infoServiceAdmin } from './information-sur-admin.service';

@Component({
  selector: 'app-informations-sur-admin',
  templateUrl: './informations-sur-admin.component.html',
  styleUrls: ['./informations-sur-admin.component.css']
})
export class InformationsSurAdminComponent implements OnInit {

  constructor(public infoService:infoServiceAdmin,
    public personneCentre:personnelService,
    public dialogRef: DialogRef<InformationsSurAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {center: covid}) {

      this.centre=data.center;

    }
   
    centre: covid;

    ngOnInit(): void {
    }

    onClear() {
      this.personneCentre.UserForm.reset();
      this.personneCentre.initializeUserFormGroup();
    }

    onSubmitAdmin() {
      if( this.personneCentre.UserForm.value.id) {
          console.log(this.personneCentre.UserForm.value);
          this.infoService.updateAdmin(this.personneCentre.UserForm.value,this.personneCentre.UserForm.value.id);
          this.personneCentre.UserForm.reset();
          this.personneCentre.initializeUserFormGroup();
          this.onClose();
      }
      else
      this.infoService.adAdminToCentre(this.personneCentre.UserForm.value,this.centre.id); 
      this.onClose();
    }

    onClose() {
      this.personneCentre.UserForm.reset();
      this.personneCentre.initializeUserFormGroup();
      this.dialogRef.close();
    }

}
