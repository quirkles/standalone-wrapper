import { Component, OnInit } from '@angular/core';

import { OrganizationService } from '../organization.service';
import { PreferenceService } from '../preferences.service';
import { Organization } from '../organization';
import { UserOrgPreferences, PreferencesFromServer } from '../preferenceDetails';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-preferences-shell',
  templateUrl: './preferences-shell.component.html',
  styleUrls: ['./preferences-shell.component.scss']
})
export class PreferencesShellComponent implements OnInit {

  constructor(
    private organizationService: OrganizationService,
    private preferenceService: PreferenceService
  ) {  }

  organizations: Organization[];
  selectedOrganizationId: string;
  selectedOrganizationPreferences: PreferencesFromServer;

  ngOnInit() {
    this.getOrganizations()
      .subscribe(orgs => {
        this.organizations = orgs;
       if (orgs.length === 1) {
        this.onOrgSelected(this.organizations[0].id);
      }
    });
  }

  getOrganizations(): Observable<Organization[]> {
    return this.organizationService
      .getOrganizations();
  }

  onOrgSelected(orgId: string): void {
    this.selectedOrganizationId = orgId;
    forkJoin([
      this.preferenceService.getApplicablePreferencesForOrg(orgId),
      this.preferenceService.getSelectedPreferencesForOrg(orgId),
    ]).subscribe(([applicablePreferences, selectedPreferences]: [UserOrgPreferences, UserOrgPreferences]): void => {
      this.selectedOrganizationPreferences =  { applicablePreferences, selectedPreferences } as PreferencesFromServer;
    });
  }

}
