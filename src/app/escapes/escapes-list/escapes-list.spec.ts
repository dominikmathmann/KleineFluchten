import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscapesList } from './escapes-list';

describe('EscapesList', () => {
  let component: EscapesList;
  let fixture: ComponentFixture<EscapesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscapesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscapesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
