import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {ShipmentService} from '../../services/shipment.service';


@Component({
  selector: 'shipments',
  templateUrl: 'app/components/shipments/shipments.html',
  directives: [],
  providers: [ShipmentService],
})
export class Shipments {
  public shipments: Array<any>;

  constructor(
    private _shipmentService: ShipmentService,
    private _router: Router
  ) {
    this.shipments = [];
  }

  ngOnInit() {
    this._shipmentService.getAll().subscribe(shipments => this.shipments = shipments);
  }

  openShipmentDetail(shipment) {
    console.log(shipment);
  }

  newShipment() {
    this._router.navigate(['NewShipment']);
  }
}
