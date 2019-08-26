import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map, tap} from 'rxjs/operators';
import {prop} from 'ramda';

import {preferencesApiUrl} from '../environments/environment';

import {UserOrgPreferences} from './preferenceDetails';
import {Observable} from 'rxjs';

export class ApplicablePreferencesApiResponse {
  prefs: UserOrgPreferences;
}

export class SelectedPreferencesApiResponse {
  prefs: UserOrgPreferences;
}

const getPrefs = prop('prefs');

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private getApplicablePreferencesUrlFromOrgId = orgId => `${preferencesApiUrl}/applicableBidPreferences/${orgId}`;  // URL to web api
  private getSelectedPreferencesUrlFromOrgId = orgId => `${preferencesApiUrl}/selectedBidPreferences/${orgId}`;  // URL to web api

  constructor(private http: HttpClient) {
  }

  getApplicablePreferencesForOrg(orgId): Observable<UserOrgPreferences> {
    return this.http
      .get<ApplicablePreferencesApiResponse>(this.getApplicablePreferencesUrlFromOrgId(orgId))
      .pipe(map(getPrefs));
  }

  getSelectedPreferencesForOrg(orgId): Observable<UserOrgPreferences> {
    return this.http
      .get<SelectedPreferencesApiResponse>(this.getSelectedPreferencesUrlFromOrgId(orgId))
      .pipe(map(getPrefs));
  }
}

export const mockPreferenceData: UserOrgPreferences = {
  'paymentMethodPrefs': [
    {
      'id': '966b340a-42a5-4a3c-9257-cb9a3e38527a',
      'name': 'payment-method-verrucosities'
    }
  ],
  'transportPrefs': [
    {
      'id': '3bd80bca-b5ee-42e3-9258-33029113fa1a',
      'name': 'transport-method-baled'
    }
  ],
  'locationPrefs': [
    {
      'id': '232ee976-0866-47c1-ad9e-c5737603c6bb',
      'name': 'location-urinometers'
    }
  ],
  'servicePrefs': [
    {
      'id': '1ca363ba-8db5-4cca-a694-ebcb169c375b',
      'name': 'service-overanalyse'
    }
  ]
};
