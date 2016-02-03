import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'shipments-detail',
  templateUrl: 'app/components/shipments/detail/detail.html',
  providers: [ShipmentService]
})
export class ShipmentDetail implements OnInit {
  public shipment;
  private google;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _shipmentService: ShipmentService
    ) { }

  ngOnInit() {
    this.shipment = {
      origin: {},
      destination: {},
      weight: {}
    };
    this._shipmentService.getOne(this._routeParams.get('id')).subscribe(result => {
      console.log(result);
      this.shipment = result;

      var origin = {
        lat: this.shipment.origin.coordinates.lat,
        lng: this.shipment.origin.coordinates.lon,
      };
      var destination = {
        lat: this.shipment.destination.coordinates.lat,
        lng: this.shipment.destination.coordinates.lon,
      };

      var map = new window.google.maps.Map(document.getElementById('shipment-detail-map'), {
        center: origin,
        scrollwheel: false,
      });

      var directionsDisplay = new window.google.maps.DirectionsRenderer({
        map: map
      });

      var request = {
        destination: destination,
        origin: origin,
        travelMode: window.google.maps.TravelMode.DRIVING
      };

      var directionsService = new window.google.maps.DirectionsService();
      directionsService.route(request, function(response, status) {
        if (status == window.google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });

    });
  }
}
