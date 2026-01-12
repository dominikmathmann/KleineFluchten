import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapesAdd } from './escapes-add';

describe('EscapesAdd', () => {
  let component: EscapesAdd;
  let fixture: ComponentFixture<EscapesAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscapesAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscapesAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
