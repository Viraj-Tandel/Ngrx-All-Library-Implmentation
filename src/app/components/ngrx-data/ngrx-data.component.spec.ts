import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataComponent } from './ngrx-data.component';

describe('NgrxDataComponent', () => {
  let component: NgrxDataComponent;
  let fixture: ComponentFixture<NgrxDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxDataComponent]
    });
    fixture = TestBed.createComponent(NgrxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
