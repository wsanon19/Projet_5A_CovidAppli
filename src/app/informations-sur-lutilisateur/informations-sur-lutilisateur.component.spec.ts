import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsSurLutilisateurComponent } from './informations-sur-lutilisateur.component';

describe('InformationsSurLutilisateurComponent', () => {
  let component: InformationsSurLutilisateurComponent;
  let fixture: ComponentFixture<InformationsSurLutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsSurLutilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsSurLutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
