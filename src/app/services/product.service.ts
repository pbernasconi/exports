import {Inject, Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  http: Http;

  constructor( @Inject(Http) http: Http) {
    this.http = http;
  }

  getAll() {
    return this.http.get('/api/product/').map(res => res.json());
  }

  getOne(id) {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }

  createOne(product) {
    return this.http.post('/api/product/', JSON.stringify(product), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  update(product) {
    return this.http.patch('/api/product/', product).map(res => res.json());
  }

  logError(error) {
    console.log(error);
  }
}
