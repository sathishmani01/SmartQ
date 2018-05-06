import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlimDetailsComponent } from './flim-details.component';

describe('FlimDetailsComponent', () => {
  let component: FlimDetailsComponent;
  let fixture: ComponentFixture<FlimDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlimDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
