import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreferencesWrapperComponent} from './preferences-wrapper.component';
import {Component, Input} from '@angular/core';
import {PreferenceDetails, PreferencesFromServer} from '../preferenceDetails';

const mockPreferencesFromServerData: PreferencesFromServer = {
  applicablePreferences: {
    paymentMethodPrefs: [],
    transportPrefs: [],
    locationPrefs: [],
    servicePrefs: [],
  },
  selectedPreferences: {
    paymentMethodPrefs: [],
    transportPrefs: [],
    locationPrefs: [],
    servicePrefs: [],
  },
};

@Component({
  selector: 'app-payment-method',
  template: `
    <div>Test app payment method</div>`
})
class TestAppPaymentMethodComponent {
  @Input() selectedPreferences: PreferenceDetails[];
  @Input() applicablePreferences: PreferenceDetails[];
}

@Component({
  selector: 'app-transport-service',
  template: `
    <div>Test app transport service</div>`
})
class TestAppTransportMethodComponent {
  @Input() selectedPreferences: PreferenceDetails[];
  @Input() applicablePreferences: PreferenceDetails[];
}

@Component({
  selector: 'app-buy-back-guarantee-option',
  template: `
    <div>Test app buy back guarantee option</div>`
})
class TestAppBuyBackGuaranteeComponent {
}

describe('PreferencesWrapperComponent', () => {
  let component: PreferencesWrapperComponent;
  let fixture: ComponentFixture<PreferencesWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PreferencesWrapperComponent,
        TestAppPaymentMethodComponent,
        TestAppTransportMethodComponent,
        TestAppBuyBackGuaranteeComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesWrapperComponent);
    component = fixture.componentInstance;
    component.preferencesFromServer = mockPreferencesFromServerData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
