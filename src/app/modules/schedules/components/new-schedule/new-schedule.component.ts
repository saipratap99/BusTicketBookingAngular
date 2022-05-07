import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {

  schedule: any = {
    busId: '',
    serviceName: '',
    basePrice: '',
    departureTime: '',
    duration: '',
    weekDay: '',
  };
  
  constructor() { }

  ngOnInit(): void {

  }

}
