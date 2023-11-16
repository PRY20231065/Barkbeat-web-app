import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMascotaComponent } from './modal-mascota.component';

describe('ModalMascotaComponent', () => {
  let component: ModalMascotaComponent;
  let fixture: ComponentFixture<ModalMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
