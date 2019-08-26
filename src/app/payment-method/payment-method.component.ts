import { Component, OnInit, Input } from '@angular/core';
import { PreferenceDetails } from '../preferenceDetails';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input() selectedPreferences: PreferenceDetails[];
  @Input() applicablePreferences: PreferenceDetails[];

  constructor() { }

  ngOnInit() {
  }



}
