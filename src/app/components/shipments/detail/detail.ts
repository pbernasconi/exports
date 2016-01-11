import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'shipments-detail',
  templateUrl: 'app/components/shipments/detail/detail.html',
  providers: [ShipmentService],
  directives: []
})
export class ShipmentDetail {

  constructor(
    private _router:Router,
    private _routeParams: RouteParams,
    private _shipmentService: ShipmentService
    ) { }

}
