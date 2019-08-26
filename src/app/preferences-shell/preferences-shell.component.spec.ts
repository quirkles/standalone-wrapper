import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement, EventEmitter, Input, Output} from '@angular/core';

import {PreferencesShellComponent} from './preferences-shell.component';

import {OrganizationService, mockOrgData} from '../organization.service';
import {mockPreferenceData, PreferenceService} from '../preferences.service';
import {of} from 'rxjs';
import {Option} from '../dropdown/option';
import {PreferencesFromServer} from '../preferenceDetails';
import {By} from '@angular/platform-browser';
import {Organization} from '../organization';

@Component({
  selector: 'app-buyer-org-select',
  template: `
    <div>Test dropdown</div>`
})
class TestBuyerOrgDropdownComponent {
  @Input() organizations: Organization[];
  @Output() orgSelected = new EventEmitter<string>();

  onSelect(orgId: string): void {
    this.orgSelected.emit(orgId);
  }
}

@Component({
  selector: 'app-preferences-wrapper',
  template: `
    <div>Test prefs wrapper</div>`
})
class TestPreferencesWrapperComponent {
  @Input() preferencesFromServer: PreferencesFromServer;
}

describe('PreferencesShellComponent', () => {

  let orgServiceMock;
  let preferenceServiceMock;
  let getOrgsSpy;
  let getApplicablePreferencesForOrgSpy;
  let getSelectedPreferencesForOrggSpy;
  let component: PreferencesShellComponent;
  let fixture: ComponentFixture<PreferencesShellComponent>;

  beforeEach(async(() => {
    orgServiceMock = jasmine.createSpyObj('OrganizationService', ['getOrganizations']);
    preferenceServiceMock = jasmine.createSpyObj('PreferenceService', ['getApplicablePreferencesForOrg', 'getSelectedPreferencesForOrg']);
    getOrgsSpy = orgServiceMock.getOrganizations.and.returnValue(of(mockOrgData));
    getApplicablePreferencesForOrgSpy = preferenceServiceMock.getApplicablePreferencesForOrg.and.returnValue(of(mockPreferenceData));
    getSelectedPreferencesForOrggSpy = preferenceServiceMock.getSelectedPreferencesForOrg.and.returnValue(of(mockPreferenceData));
    TestBed.configureTestingModule({
      declarations: [
        PreferencesShellComponent,
        TestBuyerOrgDropdownComponent,
        TestPreferencesWrapperComponent
      ],
      schemas: [],
      providers: [
        {provide: OrganizationService, useValue: orgServiceMock},
        {provide: PreferenceService, useValue: preferenceServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreferencesShellComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call organizations service', () => {
    fixture.detectChanges();
    expect(getOrgsSpy).toHaveBeenCalledTimes(1);
  });
  it('should display My Purchase Preferences header', () => {
    const shellElement: DebugElement = fixture.debugElement;
    expect(shellElement.queryAll(By.css('h1')).length).toBe(1);
    expect(shellElement.query(By.css('h1')).nativeElement.textContent).toBe('My Purchase UserOrgPreferences');
  });
  it('should render a buyer org selected component with the returned options ', () => {
    fixture.detectChanges();
    const shellElementDe: DebugElement = fixture.debugElement;
    const dropdownQuery = shellElementDe.queryAll(By.directive(TestBuyerOrgDropdownComponent));
    expect(dropdownQuery.length).toBe(1);
    const ddInstance = shellElementDe.query(By.directive(TestBuyerOrgDropdownComponent)).componentInstance;
    expect(ddInstance.organizations).toEqual(mockOrgData);
  });
  it('When dropdown emits a selected org event, fires the onOrgSelected method', () => {
    fixture.detectChanges();
    const onOrgSelectedSpy = spyOn(fixture.componentInstance, 'onOrgSelected');
    const ddInstance = fixture.debugElement.query(By.directive(TestBuyerOrgDropdownComponent)).componentInstance;
    ddInstance.onSelect('the-id');
    expect(onOrgSelectedSpy).toHaveBeenCalledWith('the-id');
  });
  it('When only one org returned, fires the onOrgSelected method', () => {
    getOrgsSpy = orgServiceMock.getOrganizations.and.returnValue(of([mockOrgData[0]]));
    fixture.detectChanges();
    const onOrgSelectedSpy = spyOn(fixture.componentInstance, 'onOrgSelected');
    const ddInstance = fixture.debugElement.query(By.directive(TestBuyerOrgDropdownComponent)).componentInstance;
    ddInstance.onSelect('the-id');
    expect(onOrgSelectedSpy).toHaveBeenCalledWith('the-id');
  });
  it('When an org is selected, the preferences service is called with the selected id', () => {
    fixture.detectChanges();
    const ddInstance = fixture.debugElement.query(By.directive(TestBuyerOrgDropdownComponent)).componentInstance;
    ddInstance.onSelect('the-id');
    expect(fixture.componentInstance.selectedOrganizationId).toBe('the-id');
    expect(getApplicablePreferencesForOrgSpy).toHaveBeenCalledWith('the-id');
    expect(getSelectedPreferencesForOrggSpy).toHaveBeenCalledWith('the-id');
    expect(fixture.componentInstance.selectedOrganizationPreferences).toEqual({
      applicablePreferences: mockPreferenceData,
      selectedPreferences: mockPreferenceData
    });
  });

  it('if org is selected and preferences are fetched, the fetch prompt should not be displayed ', () => {
    const componentInstance = fixture.componentInstance;
    const shellElement: DebugElement = fixture.debugElement;

    componentInstance.selectedOrganizationId = 'some-id';
    componentInstance.selectedOrganizationPreferences = {
      applicablePreferences: mockPreferenceData,
      selectedPreferences: mockPreferenceData
    };

    fixture.detectChanges();
    expect(shellElement.queryAll(By.css('#fetch-prompt')).length).toBe(0);
    expect(shellElement.queryAll(By.css('#select-prompt')).length).toBe(0);
    expect(shellElement.queryAll(By.directive(TestPreferencesWrapperComponent)).length).toBe(1);
  });

  it('should render the wrapper component with preferencesFromServer as an input', () => {
    const componentInstance = fixture.componentInstance;

    componentInstance.selectedOrganizationId = 'some-id';
    componentInstance.selectedOrganizationPreferences = {
      applicablePreferences: mockPreferenceData,
      selectedPreferences: mockPreferenceData
    };

    fixture.detectChanges();
    const shellElement: DebugElement = fixture.debugElement;
    const perfInstance = shellElement.query(By.directive(TestPreferencesWrapperComponent)).componentInstance;
    const expectedPreferences: PreferencesFromServer = {
      applicablePreferences: mockPreferenceData,
      selectedPreferences: mockPreferenceData
    };
    expect(perfInstance.preferencesFromServer).toEqual(expectedPreferences);
  });
});

