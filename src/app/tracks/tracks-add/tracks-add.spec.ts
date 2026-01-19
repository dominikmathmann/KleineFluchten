import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksAdd } from './tracks-add';

describe('TracksAdd', () => {
  let component: TracksAdd;
  let fixture: ComponentFixture<TracksAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
