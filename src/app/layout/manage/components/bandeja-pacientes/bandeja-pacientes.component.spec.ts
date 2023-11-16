import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaPacientesComponent } from './bandeja-pacientes.component';

describe('BandejaPacientesComponent', () => {
  let component: BandejaPacientesComponent;
  let fixture: ComponentFixture<BandejaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
