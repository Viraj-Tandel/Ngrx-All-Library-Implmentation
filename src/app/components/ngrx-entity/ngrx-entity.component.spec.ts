import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxEntityComponent } from './ngrx-entity.component';

describe('NgrxEntityComponent', () => {
  let component: NgrxEntityComponent;
  let fixture: ComponentFixture<NgrxEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgrxEntityComponent]
    });
    fixture = TestBed.createComponent(NgrxEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
