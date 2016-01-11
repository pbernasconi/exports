import {Component} from 'angular2/core';
import {NgFor, NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {ShipmentService} from '../../../services/shipment.service';


@Component({
  selector: 'new-shipment',
  templateUrl: 'app/components/shipments/new/new.html',
  directives: [NgFor, NgForm, FORM_DIRECTIVES],
  providers: [ShipmentService],
})
export class ShipmentNew {
  public model: Object;

  constructor(
    private _shipmentService: ShipmentService
    ) {
    this.model = { name: 'New shipment', origin: 'GVA', destination: 'ROT', status: 'new' };
  }

  onSubmit() {
    this._shipmentService.createOne(this.model).subscribe(result => console.log(result));
  }

  showFormControls(form: NgForm) {
    return form.controls['alterEgo'] && form.controls['name'].value;
  }
}
