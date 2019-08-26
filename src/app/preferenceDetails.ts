export class PreferenceDetails {
  id: string;
  name: string;
}

export class UserOrgPreferences {
  paymentMethodPrefs: PreferenceDetails[];
  transportPrefs: PreferenceDetails[];
  locationPrefs: PreferenceDetails[];
  servicePrefs: PreferenceDetails[];
}

export class CategoryPreferences {
  selectedPreferences: PreferenceDetails[];
  applicablePreferences: PreferenceDetails[];
}

export class PreferencesFromServer {
  selectedPreferences: UserOrgPreferences;
  applicablePreferences: UserOrgPreferences;
}


