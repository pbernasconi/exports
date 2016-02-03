import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'shipments-detail',
  templateUrl: 'app/components/shipments/detail/detail.html',
  providers: [ShipmentService]
})
export class ShipmentDetail implements OnInit {
  public shipment: Object;
  private google;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _shipmentService: ShipmentService
    ) { }

  ngOnInit() {
    this.shipment = {};
    this._shipmentService.getOne(this._routeParams.get('id'))
      .subscribe(result => {
      console.log(result);
      this.shipment = result;
    });

    var chicago = { lat: 41.85, lng: -87.65 };
    var indianapolis = { lat: 39.79, lng: -86.14 };

    var map = new window.google.maps.Map(document.getElementById('shipment-detail-map'), {
      center: chicago,
      scrollwheel: false,
    });

    var directionsDisplay = new window.google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: indianapolis,
      origin: chicago,
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new window.google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == window.google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }
}
