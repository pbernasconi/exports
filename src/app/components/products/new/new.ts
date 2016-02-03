import {Component, NgZone} from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor, NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {ProductService} from '../../../services/product.service';


@Component({
  selector: 'new-product',
  templateUrl: 'app/components/products/new/new.html',
  directives: [NgFor, NgForm, FORM_DIRECTIVES],
  providers: [ProductService],
})
export class ProductsNew {
  public model;
  public componentForm;
  zone: NgZone;

  constructor(
    private _shipmentService: ProductService,
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
  }

  onSubmit() {
    this._shipmentService.createOne(this.model).subscribe(result => {
      this._router.navigate(['Shipments']);
    });
  }
}
