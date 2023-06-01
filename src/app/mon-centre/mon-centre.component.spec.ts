import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCentreComponent } from './mon-centre.component';

describe('MonCentreComponent', () => {
  let component: MonCentreComponent;
  let fixture: ComponentFixture<MonCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
