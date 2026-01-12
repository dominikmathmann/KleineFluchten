import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarVoting } from './star-voting';

describe('StarVoting', () => {
  let component: StarVoting;
  let fixture: ComponentFixture<StarVoting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarVoting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarVoting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
