import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPacientesComponent } from './buscar-pacientes.component';

describe('BuscarPacientesComponent', () => {
  let component: BuscarPacientesComponent;
  let fixture: ComponentFixture<BuscarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
