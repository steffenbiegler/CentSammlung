import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentComponent } from './add-cent.component';

describe('AddCentComponent', () => {
  let component: AddCentComponent;
  let fixture: ComponentFixture<AddCentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
