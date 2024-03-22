import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSignalStoreComponent } from './ngrx-signal-store.component';

describe('NgrxSignalStoreComponent', () => {
  let component: NgrxSignalStoreComponent;
  let fixture: ComponentFixture<NgrxSignalStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxSignalStoreComponent]
    });
    fixture = TestBed.createComponent(NgrxSignalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
