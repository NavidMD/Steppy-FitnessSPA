import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserPanelComponent } from './dashboard-user-panel.component';

describe('DashboardUserPanelComponent', () => {
  let component: DashboardUserPanelComponent;
  let fixture: ComponentFixture<DashboardUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUserPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
