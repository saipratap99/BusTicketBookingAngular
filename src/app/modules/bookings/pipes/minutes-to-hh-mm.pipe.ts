import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHHMM'
})
export class MinutesToHhMmPipe implements PipeTransform {

  transform(value: number): string {
    return Math.floor(value / 60) + 'h ' + value % 60 + 'm';
  }

}
