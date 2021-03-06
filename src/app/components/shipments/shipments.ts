import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {ShipmentService} from '../../services/shipment.service';


@Component({
  selector: 'shipments',
  templateUrl: 'app/components/shipments/shipments.html',
  providers: [ShipmentService],
})
export class Shipments {
  public shipments: Array<any>;

  constructor(
    private _shipmentService: ShipmentService,
    private _router: Router
    ) {
    this.shipments = [];
    this._shipmentService.getAll().subscribe(result => this.shipments = result);
  }

  openShipmentDetail(shipment) {
    this._router.navigate(['ShipmentDetail', { id: shipment._id }]);
  }

  newShipment() {
    this._router.navigate(['ShipmentNew']);
  }
}
