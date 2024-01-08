import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSmarteduComponent } from './best-smartedu.component';

describe('BestSmarteduComponent', () => {
  let component: BestSmarteduComponent;
  let fixture: ComponentFixture<BestSmarteduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestSmarteduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSmarteduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
