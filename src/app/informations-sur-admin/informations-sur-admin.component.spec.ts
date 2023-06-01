import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsSurAdminComponent } from './informations-sur-admin.component';

describe('InformationsSurAdminComponent', () => {
  let component: InformationsSurAdminComponent;
  let fixture: ComponentFixture<InformationsSurAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsSurAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsSurAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
