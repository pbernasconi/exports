import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {ExportsApp} from './app/exports';


bootstrap(ExportsApp, [
  ROUTER_PROVIDERS
]);
