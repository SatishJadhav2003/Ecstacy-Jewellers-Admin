import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCateNameComponent } from './update-cate-name.component';

describe('UpdateCateNameComponent', () => {
  let component: UpdateCateNameComponent;
  let fixture: ComponentFixture<UpdateCateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCateNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
