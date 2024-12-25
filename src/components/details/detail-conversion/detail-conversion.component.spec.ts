import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConversionComponent } from './detail-conversion.component';

describe('DetailConversionComponent', () => {
  let component: DetailConversionComponent;
  let fixture: ComponentFixture<DetailConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailConversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
