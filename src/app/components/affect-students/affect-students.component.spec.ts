import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectStudentsComponent } from './affect-students.component';

describe('AffectStudentsComponent', () => {
  let component: AffectStudentsComponent;
  let fixture: ComponentFixture<AffectStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
