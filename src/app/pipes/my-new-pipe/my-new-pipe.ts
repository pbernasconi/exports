import {Pipe} from 'angular2/core';


@Pipe({
  name: 'MyNewPipe'
})
export class MyNewPipe {

  transform(value, args?) {
    return null;
  }

}
