import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Shipments } from './components/shipments/shipments';
import { Settings } from './components/settings/settings';

@Component({
  selector: 'exports-app',
  templateUrl: 'app/exports.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: Dashboard, name: 'Dashboard', useAsDefault: true },
  { path: '/shipments', component: Shipments, name: 'Shipments' },
  { path: '/settings', component: Settings, name: 'Settings' }
])
export class ExportsApp {}
