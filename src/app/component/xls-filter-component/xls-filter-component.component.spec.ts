import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsFilterComponentComponent } from './xls-filter-component.component';

describe('XlsFilterComponentComponent', () => {
  let component: XlsFilterComponentComponent;
  let fixture: ComponentFixture<XlsFilterComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XlsFilterComponentComponent]
    });
    fixture = TestBed.createComponent(XlsFilterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
