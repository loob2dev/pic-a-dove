import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrowsersComponent } from './edit-browsers.component';

describe('EditBrowsersComponent', () => {
  let component: EditBrowsersComponent;
  let fixture: ComponentFixture<EditBrowsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBrowsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBrowsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
