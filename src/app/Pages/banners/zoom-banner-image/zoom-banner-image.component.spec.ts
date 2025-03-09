import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomBannerImageComponent } from './zoom-banner-image.component';

describe('ZoomBannerImageComponent', () => {
  let component: ZoomBannerImageComponent;
  let fixture: ComponentFixture<ZoomBannerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomBannerImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZoomBannerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
