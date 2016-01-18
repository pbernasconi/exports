import {Component} from 'angular2/core';
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
  public componentForm;

  constructor(
    private _shipmentService: ShipmentService,
    private _router: Router
    ) {
    this.model = {
      name: 'New shipment',
      freight_type: 'String',
      shipment_method: 'String',
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
      desination: {
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
      status: 'String',
    };

    this.initOriginAddress()
  }

  initOriginAddress() {
    this.componentForm = {
      street_number: 'street_number',
      route: 'street',
      locality: 'city',
      administrative_area_level_1: 'state',
      country: 'country',
      postal_code: 'postal_code'
    }

    this.originAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('origin-address'), { types: ['geocode'] });

    this.originAutocomplete.addListener('place_changed', () => {
      let place = this.originAutocomplete.getPlace();

      for (let component in this.componentForm) {
        this.model.origin[this.componentForm[component]] = '';
      }

      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (this.componentForm[addressType]) {
          var val = place.address_components[i]['long_name'];
          this.model.origin[this.componentForm[addressType]] = val;
        }
      }
    });
  }

  onSubmit() {
    this._shipmentService.createOne(this.model).subscribe(result => {
      this._router.navigate(['Shipments']);
    });
  }
}
