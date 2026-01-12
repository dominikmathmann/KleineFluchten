import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIcon } from './type-icon';

describe('TypeIcon', () => {
  let component: TypeIcon;
  let fixture: ComponentFixture<TypeIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
