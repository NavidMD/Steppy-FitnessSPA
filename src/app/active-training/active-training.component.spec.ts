import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTrainingComponent } from './active-training.component';

describe('ActiveTrainingComponent', () => {
  let component: ActiveTrainingComponent;
  let fixture: ComponentFixture<ActiveTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
