import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEvaluationComponent } from './note-evaluation.component';

describe('NoteEvaluationComponent', () => {
  let component: NoteEvaluationComponent;
  let fixture: ComponentFixture<NoteEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
