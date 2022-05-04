import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addMinutesToStrDate'
})
export class AddMinutesToDatePipe implements PipeTransform {

  transform(value: string, duration: number): Date {
    return new Date(Date.parse(value) + duration*60*1000);
  }

}
