import {declarations as prodDeclarations} from './declarations.prod';
import {StandaloneDropdownComponent} from './dropdown/dropdown.standalone.component';
import {StandaloneBuyerOrgSelectComponent} from './buyer-org-select/buyer-org-select.standalone.component';
import {StandaloneWrapperComponent} from './standalone-wrapper/standalone-wrapper.component';
import {EventListComponent} from './standalone-wrapper/event-list/event-list.component';
import {ConfigPaneComponent} from './standalone-wrapper/config-pane/config-pane.component';
import {CustomDataTabComponent} from './standalone-wrapper/custom-data-tab/custom-data-tab.component';
import {ConfigSettingsTabComponent} from './standalone-wrapper/config-settings-tab/config-settings-tab.component';
import {ViewDataTabComponent} from './standalone-wrapper/view-data-tab/view-data-tab.component';

const devDeclarations = [
  StandaloneDropdownComponent,
  StandaloneBuyerOrgSelectComponent,
  StandaloneWrapperComponent,
  CustomDataTabComponent,
  ConfigSettingsTabComponent,
  ViewDataTabComponent,
  ConfigPaneComponent,
  EventListComponent,
];

export const declarations = [
  ...prodDeclarations,
  ...devDeclarations
];
