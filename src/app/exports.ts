import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Dashboard} from './components/dashboard/dashboard';
import {Shipments} from './components/shipments/shipments';
import {ShipmentDetail} from './components/shipments/detail/detail';
import {ShipmentNew} from './components/shipments/new/new';
import {Products} from './components/products/products';
import {Settings} from './components/settings/settings';


@Component({
    selector: 'exports-app',
    templateUrl: 'app/exports.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: Dashboard, name: 'Dashboard', useAsDefault: true },
    { path: '/shipments', component: Shipments, name: 'Shipments' },
    { path: '/shipments/:id', component: ShipmentDetail, name: 'ShipmentDetail' },
    { path: '/shipments/new', component: ShipmentNew, name: 'ShipmentNew' },
    { path: '/products', component: Products, name: 'Products' },
    { path: '/settings', component: Settings, name: 'Settings' }
])

export class ExportsApp { }
