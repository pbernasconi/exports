import {Inject, Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ShipmentService {
  http: Http;

  constructor( @Inject(Http) http: Http) {
    this.http = http;
  }

  getAll() {
    return this.http.get('/api/shipment/').map(res => res.json());
  }

  getOne(id: String) {
    return this.http.get('/api/shipment/' + id).map(res => res.json());
  }

  createOne(shipment) {
    return this.http.post('/api/shipment/', JSON.stringify(shipment), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  update(shipment) {
    return this.http.patch('/api/shipment/', shipment).map(res => res.json());
  }

  logError(error: String) {
    console.log(error);
  }
}
