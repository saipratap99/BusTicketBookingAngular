import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDay'
})
export class WeekDayPipe implements PipeTransform {

  transform(value: number): string {
    if(value == 1)
      return 'Sunday';
    else if( value == 2 )
      return 'Monday';
    else if( value == 3 )
      return 'Tuesday';
    else if( value == 4 )
      return 'Wednesday';
    else if( value == 5 )
      return 'Thursday';
    else if( value == 6 )
      return 'Friday';
    else
      return 'Saturday';
  }

}
