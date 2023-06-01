import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeRendezVousComponent } from './confirmation-de-rendez-vous.component';

describe('ConfirmationDeRendezVousComponent', () => {
  let component: ConfirmationDeRendezVousComponent;
  let fixture: ComponentFixture<ConfirmationDeRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeRendezVousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
