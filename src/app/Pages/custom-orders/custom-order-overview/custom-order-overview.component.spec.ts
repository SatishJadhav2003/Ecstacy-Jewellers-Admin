import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOrderOverviewComponent } from './custom-order-overview.component';

describe('CustomOrderOverviewComponent', () => {
  let component: CustomOrderOverviewComponent;
  let fixture: ComponentFixture<CustomOrderOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomOrderOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
