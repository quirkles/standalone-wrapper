import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBackGuaranteeOptionComponent } from './buy-back-guarantee-option.component';

describe('BuyBackGuranteeOptionComponent', () => {
  let component: BuyBackGuaranteeOptionComponent;
  let fixture: ComponentFixture<BuyBackGuaranteeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyBackGuaranteeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBackGuaranteeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
