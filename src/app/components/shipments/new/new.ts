import {Component, NgZone} from 'angular2/core';
import {Router} from 'angular2/router';
import {NgFor, NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {ShipmentService} from '../../../services/shipment.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'new-shipment',
  templateUrl: 'app/components/shipments/new/new.html',
  directives: [NgFor, NgForm, FORM_DIRECTIVES],
  providers: [ShipmentService, ProductService],
})
export class ShipmentNew {
  public model;
  public originAutocomplete;
  public destinationAutocomplete;
  public componentForm;
  public products: Array<any>;
  zone: NgZone;


  constructor(
    private _shipmentService: ShipmentService,
    private _productService: ProductService,
    private _router: Router,
    _zone: NgZone
    ) {
    this.products = [];
    this._productService.getAll().subscribe(result => this.products = result);
    this.zone = _zone;
    this.model = {
      name: 'New shipment',
      freight_type: '',
      shipment_method: '',
      products: [],
      documents: [],
      container: {
        type: '',
        number: '',
      },
      weight: {
        total: 0,
        net: 0,
      },
      carrier: {
        imo: null,
        mmsi: null,
        call_sign: null,
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


  logForm(e) {
    console.log(this.model);
  }

  initOriginAddress() {
    var self = this;


    this.originAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('origin-address'), {
        types: ['(cities)']
      });

    this.originAutocomplete.addListener('place_changed', () => {
      let place = this.originAutocomplete.getPlace();

      this.zone.run(() => {
        for (let component in this.componentForm) {
          this.model.origin[this.componentForm[component]] = '';
        }

        this.model.origin.coordinates.lon = place.geometry.location.lng();
        this.model.origin.coordinates.lat = place.geometry.location.lat();

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
      document.getElementById('destination-address'), {
        types: ['(cities)']
      });

    this.destinationAutocomplete.addListener('place_changed', () => {
      let place = this.destinationAutocomplete.getPlace();

      this.zone.run(() => {
        for (let component in this.componentForm) {
          this.model.destination[this.componentForm[component]] = '';
        }

        this.model.destination.coordinates.lon = place.geometry.location.lng();
        this.model.destination.coordinates.lat = place.geometry.location.lat();

        console.log(this.model.destination)
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

  selectProduct(product) {
    this.zone.run(() => {
      this.model.products.push(product);
    });
  }


  uploadFile() {
    var hiddenInput = document.querySelectorAll('.dropzone__hiddeninput')[0];
    hiddenInput.click();
  }

  handleDrop(e) {
    var files: File = e.dataTransfer.files;
    var self = this;
    Object.keys(files).forEach((key) => {
      console.log(files)
      self.model.documents.push(files[key]);
    });

    return false;
  }

  handleOnFileChange(e) {
    var self = this;
    var file, files;
    files = e.target.files;
    if (files.length) {
      Object.keys(files).forEach((key) => {
        self.model.documents.push(files[key]);
      });
    }
  }

  onSubmit() {
    this._shipmentService.createOne(this.model).subscribe(
      result => {
        this._router.navigate(['Shipments']);
      },
      err => {
        console.log(err);
      });
  }
}
