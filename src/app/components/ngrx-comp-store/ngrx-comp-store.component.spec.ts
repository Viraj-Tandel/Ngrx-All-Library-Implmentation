import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCompStoreComponent } from './ngrx-comp-store.component';

describe('NgrxCompStoreComponent', () => {
  let component: NgrxCompStoreComponent;
  let fixture: ComponentFixture<NgrxCompStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxCompStoreComponent]
    });
    fixture = TestBed.createComponent(NgrxCompStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
