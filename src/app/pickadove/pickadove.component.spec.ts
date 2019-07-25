import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickadoveComponent } from './pickadove.component';

describe('PickadoveComponent', () => {
  let component: PickadoveComponent;
  let fixture: ComponentFixture<PickadoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickadoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickadoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
