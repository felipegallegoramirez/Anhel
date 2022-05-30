import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAsesorComponent } from './stats-asesor.component';

describe('StatsAsesorComponent', () => {
  let component: StatsAsesorComponent;
  let fixture: ComponentFixture<StatsAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAsesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
