import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4Component } from './s4.component';

describe('HomeComponent', () => {
  let component: S4Component;
  let fixture: ComponentFixture<S4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
