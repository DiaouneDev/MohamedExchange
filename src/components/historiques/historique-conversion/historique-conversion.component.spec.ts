import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueConversionsComponent } from './historique-conversion.component';

describe('HistoriqueConversionComponent', () => {
  let component: HistoriqueConversionsComponent;
  let fixture: ComponentFixture<HistoriqueConversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueConversionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
