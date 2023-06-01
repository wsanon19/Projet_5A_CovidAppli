import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsSurSuperAdminComponent } from './informations-sur-super-admin.component';

describe('InformationsSurSuperAdminComponent', () => {
  let component: InformationsSurSuperAdminComponent;
  let fixture: ComponentFixture<InformationsSurSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsSurSuperAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsSurSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
