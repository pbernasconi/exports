import {Component, NgZone} from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor, NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'new-shipment',
  templateUrl: 'app/components/shipments/new/new.html',
  directives: [NgFor, NgForm, FORM_DIRECTIVES],
  providers: [ShipmentService],
})
export class ShipmentNew {
  public model;
  public originAutocomplete;
  public destinationAutocomplete;
  public componentForm;
  zone: NgZone;

  constructor(
    private _shipmentService: ShipmentService,
    private _router: Router,
    _zone: NgZone
    ) {
    this.zone = _zone;
    this.model = {
      name: 'New shipment',
      freight_type: '',
      shipment_method: '',
      container: {},
      weight: {
        total: 0,
        net: 0,
      },
      origin: {
        street: '',
        street_number: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        coordinates: {
          lat: 0,
          lon: 0,
        },
      },
      destination: {
        street: '',
        street_number: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        coordinates: {
          lat: 0,
          lon: 0,
        },
      },
      departure_date: new Date(),
      arrival_date: new Date(),
      status: '',
    };

    this.componentForm = {
      street_number: 'street_number',
      route: 'street',
      locality: 'city',
      administrative_area_level_1: 'state',
      country: 'country',
      postal_code: 'postal_code'
    }

    this.initOriginAddress();
    this.initDestinationAddress();
  }

  initOriginAddress() {
    var self = this;


    this.originAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('origin-address'), { types: ['geocode'] });

    this.originAutocomplete.addListener('place_changed', () => {
      let place = this.originAutocomplete.getPlace();

      this.zone.run(() => {
        for (let component in this.componentForm) {
          self.model.origin[this.componentForm[component]] = '';
        }

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (self.componentForm[addressType]) {
            var val = place.address_components[i]['long_name'];
            self.model.origin[self.componentForm[addressType]] = val;
          }
        }
      });
    });
  }

  initDestinationAddress() {
    this.destinationAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('destination-address'), { types: ['geocode'] });

    this.destinationAutocomplete.addListener('place_changed', () => {
      let place = this.destinationAutocomplete.getPlace();

      this.zone.run(() => {

        for (let component in this.componentForm) {
          this.model.destination[this.componentForm[component]] = '';
        }

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = place.address_components[i]['long_name'];
            this.model.destination[this.componentForm[addressType]] = val;
          }
        }
      });
    });
  }

  onSubmit() {
    this._shipmentService.createOne(this.model).subscribe(result => {
      this._router.navigate(['Shipments']);
    });
  }
}
