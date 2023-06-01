import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { configService } from '../config/config.service';
import { covid } from '../interfaceCovid';
import { personnelService } from '../personnel-dun-centre/personnel-dun-centre.service';
import { infoSuperAdminService } from './informations-sur-super-admin.service';

@Component({
  selector: 'app-informations-sur-super-admin',
  templateUrl: './informations-sur-super-admin.component.html',
  styleUrls: ['./informations-sur-super-admin.component.css']
})
export class InformationsSurSuperAdminComponent implements OnInit {

  constructor(public infoService:infoSuperAdminService,
    public config:configService,
    public personneCentre:personnelService,
    public dialogRef: DialogRef<InformationsSurSuperAdminComponent>) {}

    ngOnInit(): void {
    }

    onClear() {
      this.infoService.UserForm.reset();
      this.infoService.initializeUserFormGroup();
    }

    onSubmitSuperAdmin() {
      if( this.personneCentre.UserForm.value.id) {
          console.log(this.personneCentre.UserForm.value);
          this.infoService.updateSuperAdmin(this.infoService.UserForm.value,this.infoService.UserForm.value.id);
          this.personneCentre.UserForm.reset();
          this.personneCentre.initializeUserFormGroup();
          this.onClose();
      }
      else
      this.infoService.adSuperAdmin(this.infoService.UserForm.value); 
      console.log(this.personneCentre.UserForm.value.id)
      this.onClose();
    }

    onClose() {
      this.infoService.UserForm.reset();
      this.infoService.initializeUserFormGroup();
      this.dialogRef.close();
    }

}
