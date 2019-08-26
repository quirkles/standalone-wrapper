import { routes as prodRoutes } from './routes.prod';
import {Routes} from '@angular/router';
import {StandaloneDropdownComponent} from './dropdown/dropdown.standalone.component';
import {StandaloneBuyerOrgSelectComponent} from './buyer-org-select/buyer-org-select.standalone.component';

const devRoutes: Routes = [
  { path: 'standalone/dropdown', component: StandaloneDropdownComponent },
  { path: 'standalone/buyer-org-select', component: StandaloneBuyerOrgSelectComponent },
];

export const routes = [
  ...prodRoutes,
  ...devRoutes
];
