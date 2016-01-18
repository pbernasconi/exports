import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'shipments-detail',
  templateUrl: 'app/components/shipments/detail/detail.html',
  providers: [ShipmentService]
})
export class ShipmentDetail {
  public shipment: Object;
  private google;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _shipmentService: ShipmentService
    ) {
    this.shipment = {};
    this._shipmentService.getOne(_routeParams.get('id')).subscribe(result => this.shipment = result);
    this.google = window.google || {};;
    this.initMap();
  }


  initMap() {
    var chicago = { lat: 41.85, lng: -87.65 };
    var indianapolis = { lat: 39.79, lng: -86.14 };

    var map = new this.google.maps.Map(document.getElementById('shipment-detail-map'), {
      center: chicago,
      scrollwheel: false,
    });

    var directionsDisplay = new this.google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: indianapolis,
      origin: chicago,
      travelMode: this.google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new this.google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == this.google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }
}
