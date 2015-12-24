import {Component} from 'angular2/core';


@Component({
  selector: 'exports-app',
  providers: [],
  templateUrl: 'app/exports.html',
  directives: [],
  pipes: []
})
export class ExportsApp {
  defaultMeaning: number = 42;
  
  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
