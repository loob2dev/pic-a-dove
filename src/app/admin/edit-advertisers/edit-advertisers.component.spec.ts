import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertisersComponent } from './edit-advertisers.component';

describe('EditAdvertisersComponent', () => {
  let component: EditAdvertisersComponent;
  let fixture: ComponentFixture<EditAdvertisersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdvertisersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvertisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
