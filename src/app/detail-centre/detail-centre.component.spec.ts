import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCentreComponent } from './detail-centre.component';

describe('DetailCentreComponent', () => {
  let component: DetailCentreComponent;
  let fixture: ComponentFixture<DetailCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
