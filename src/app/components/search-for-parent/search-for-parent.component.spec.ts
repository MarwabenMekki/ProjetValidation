import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForParentComponent } from './search-for-parent.component';

describe('SearchForParentComponent', () => {
  let component: SearchForParentComponent;
  let fixture: ComponentFixture<SearchForParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchForParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
