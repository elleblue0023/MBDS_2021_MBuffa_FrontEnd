import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkLateDate'
})
export class CheckLateDatePipe implements PipeTransform {

    transform(value: string) {
        
      var _value = Number(value);
      
      var dif = Math.floor(((Date.now() - _value) / 1000 ) / 86400 );
      console.log(dif);
      
      return dif;
  }
}
