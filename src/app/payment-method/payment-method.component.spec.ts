import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement, Input} from '@angular/core';
import {By} from '@angular/platform-browser';

import { PaymentMethodComponent } from './payment-method.component';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Payment Methods header', () => {
    const shellElement: DebugElement = fixture.debugElement;

    expect(shellElement.queryAll(By.css('span')).length).toBe(1);
    expect(shellElement.query(By.css('span')).nativeElement.textContent).toBe('PAYMENT METHODS');
  });

  it('should display Ranking Payment Method text', () => {
    const shellElement: DebugElement = fixture.debugElement;

    expect(shellElement.queryAll(By.css('p')).length).toBe(1);
    expect(shellElement.query(By.css('p')).nativeElement.textContent).toBe('Rank your payment methods in order of priority');
  });

  it('should display Select From Your Payment Method only if selectedPreferences is not set', () => {
    component.selectedPreferences = [];

    fixture.detectChanges();
    const shellElement: DebugElement = fixture.debugElement;

    expect(shellElement.queryAll(By.css('.no-preferences')).length).toBe(1);
    expect(shellElement.queryAll(By.css('a')).length).toBe(1);
    expect(shellElement.query(By.css('a')).nativeElement.textContent).toBe('+ Select From Your Payment Method');
  });

  it('should not display Applicable Preferences if selectedPreferences is not set', () => {
    component.selectedPreferences = [];

    fixture.detectChanges();
    const shellElement: DebugElement = fixture.debugElement;
    const htmlOptions = shellElement.queryAll(By.css('.selected-preferences'));

    expect(htmlOptions.length).toBe(0);
  });

  it('should display Selected Preferences if selectedPreferences is set', () => {
    component.selectedPreferences = [{id: 'test', name: 'test2'}];

    fixture.detectChanges();
    const shellElement: DebugElement = fixture.debugElement;

    expect(shellElement.queryAll(By.css('.selected-preferences')).length).toBe(1);
    expect(shellElement.queryAll(By.css('label')).length).toBe(1);
    expect(shellElement.query(By.css('label')).nativeElement.textContent).toBe(component.selectedPreferences[0].name);
  });

});
