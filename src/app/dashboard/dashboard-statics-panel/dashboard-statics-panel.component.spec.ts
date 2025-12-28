import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaticsPanelComponent } from './dashboard-statics-panel.component';

describe('DashboardStaticsPanelComponent', () => {
  let component: DashboardStaticsPanelComponent;
  let fixture: ComponentFixture<DashboardStaticsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardStaticsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardStaticsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
