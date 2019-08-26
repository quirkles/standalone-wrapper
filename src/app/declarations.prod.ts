import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { PreferencesWrapperComponent } from './preferences-wrapper/preferences-wrapper.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { TransportServiceComponent } from './transport/transport-service.component';
import { BuyBackGuaranteeOptionComponent } from './buy-back-guarantee-option/buy-back-guarantee-option.component';
import {PreferencesShellComponent} from './preferences-shell/preferences-shell.component';
import {BuyerOrgSelectComponent} from './buyer-org-select/buyer-org-select.component';
import {GetDropdownOptionsPipe} from './dropdown/getOptions.pipe';

export const declarations = [
  AppComponent,
  PreferencesShellComponent,
  DropdownComponent,
  PreferencesWrapperComponent,
  PaymentMethodComponent,
  TransportServiceComponent,
  BuyBackGuaranteeOptionComponent,
  BuyerOrgSelectComponent,
  GetDropdownOptionsPipe
];
