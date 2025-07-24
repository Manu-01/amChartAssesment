import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcareChartComponent } from './icare-chart.component';

describe('IcareChartComponent', () => {
  let component: IcareChartComponent;
  let fixture: ComponentFixture<IcareChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcareChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcareChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
