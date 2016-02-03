import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {ProductService} from '../../../services/product.service';


@Component({
  selector: 'shipments-detail',
  templateUrl: 'app/components/products/detail/detail.html',
  providers: [ProductService]
})
export class ProductsDetail implements OnInit {
  public product: Object;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _productService: ProductService
    ) {}

  ngOnInit() {
    this.product = {unit_cost: {}};
    this._productService
      .getOne(this._routeParams.get('id'))
      .subscribe(result => this.product = result);
  }
}
