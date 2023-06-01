import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDunCentreComponent } from './personnel-dun-centre.component';

describe('PersonnelDunCentreComponent', () => {
  let component: PersonnelDunCentreComponent;
  let fixture: ComponentFixture<PersonnelDunCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelDunCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelDunCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
