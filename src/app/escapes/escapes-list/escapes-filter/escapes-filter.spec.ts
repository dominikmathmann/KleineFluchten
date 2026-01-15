import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapesFilter } from './escapes-filter';

describe('EscapesFilter', () => {
  let component: EscapesFilter;
  let fixture: ComponentFixture<EscapesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscapesFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscapesFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
