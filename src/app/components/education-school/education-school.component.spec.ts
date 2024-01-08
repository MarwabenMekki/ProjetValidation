import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSchoolComponent } from './education-school.component';

describe('EducationSchoolComponent', () => {
  let component: EducationSchoolComponent;
  let fixture: ComponentFixture<EducationSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
