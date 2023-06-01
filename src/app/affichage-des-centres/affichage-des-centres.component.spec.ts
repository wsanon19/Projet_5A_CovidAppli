import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageDesCentresComponent } from './affichage-des-centres.component';

describe('AffichageDesCentresComponent', () => {
  let component: AffichageDesCentresComponent;
  let fixture: ComponentFixture<AffichageDesCentresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageDesCentresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageDesCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
