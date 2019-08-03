import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { navbar_aComponent } from './navbar_a.component';

describe('navbar_aComponent', () => {
  let component: navbar_aComponent;
  let fixture: ComponentFixture<navbar_aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ navbar_aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(navbar_aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
