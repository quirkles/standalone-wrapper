import { Component, OnInit, Input } from '@angular/core';
import {UserOrgPreferences, CategoryPreferences, PreferencesFromServer, PreferenceDetails} from '../preferenceDetails';

@Component({
  selector: 'app-transport-service',
  templateUrl: './transport-service.component.html',
  styleUrls: ['./transport-service.component.scss']
})
export class TransportServiceComponent implements OnInit {

  @Input() applicablePreferences: PreferenceDetails[];
  @Input() selectedPreferences: PreferenceDetails[];

  constructor() { }

  ngOnInit() {
  }

}
