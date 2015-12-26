import {Component} from 'angular2/core';
import {NgFor, NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'new-shipment',
  templateUrl: 'app/components/shipments/new/new.html',
  directives: [NgFor, NgForm, FORM_DIRECTIVES],
  providers: [ShipmentService],
})
export class NewShipment {
  public model: Object;

  constructor(
    private _shipmentService: ShipmentService
  ) {
    this.model = { name: 'New shipment', origin: 'GVA', destination: 'ROT', status: 'new' };
  }

  onSubmit() {
    console.log(this.model);
    this._shipmentService.createOne(this.model);
  }

  showFormControls(form: NgForm) {
    return form.controls['alterEgo'] && form.controls['name'].value;
  }
}
