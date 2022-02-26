import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6Component } from './s6.component';

describe('S6Component', () => {
  let component: S6Component;
  let fixture: ComponentFixture<S6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
