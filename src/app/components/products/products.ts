import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {ProductService} from '../../services/product.service';


@Component({
  selector: 'products',
  templateUrl: 'app/components/products/products.html',
  providers: [ProductService],
})
export class Products {
  public products: Array<any>;

  constructor(
    private _productService: ProductService,
    private _router: Router
    ) {
    this.products = [];
    this._productService.getAll().subscribe(result => this.products = result);
  }
}
