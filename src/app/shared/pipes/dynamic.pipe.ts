import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  transform(value: any, ...args: any[]/*, pipe: PipeTransform*/): any {
    if (args[0]) {
      const pipe: PipeTransform = args.shift();

      return pipe.transform(value, ...args);
    }

    return value;
  }
}
