import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpublicationComponent } from './spublication.component';

describe('SpublicationComponent', () => {
  let component: SpublicationComponent;
  let fixture: ComponentFixture<SpublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
