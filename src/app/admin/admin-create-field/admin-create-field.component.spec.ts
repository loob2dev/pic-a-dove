import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateFieldComponent } from './admin-create-field.component';

describe('AdminCreateFieldComponent', () => {
  let component: AdminCreateFieldComponent;
  let fixture: ComponentFixture<AdminCreateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
