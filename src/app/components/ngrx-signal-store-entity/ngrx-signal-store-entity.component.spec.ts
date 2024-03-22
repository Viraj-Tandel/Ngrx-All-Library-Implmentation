import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSignalStoreEntityComponent } from './ngrx-signal-store-entity.component';

describe('NgrxSignalStoreEntityComponent', () => {
  let component: NgrxSignalStoreEntityComponent;
  let fixture: ComponentFixture<NgrxSignalStoreEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxSignalStoreEntityComponent]
    });
    fixture = TestBed.createComponent(NgrxSignalStoreEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
