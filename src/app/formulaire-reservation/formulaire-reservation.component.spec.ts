import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireReservationComponent } from './formulaire-reservation.component';

describe('FormulaireReservationComponent', () => {
  let component: FormulaireReservationComponent;
  let fixture: ComponentFixture<FormulaireReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
