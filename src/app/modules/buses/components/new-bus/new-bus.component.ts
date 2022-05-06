import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-bus',
  templateUrl: './new-bus.component.html',
  styleUrls: ['./new-bus.component.css']
})
export class NewBusComponent implements OnInit {

  busDetails: any = {
    id: 0,
    model: '',
    busRegNumber: '',
    busType: '',
    seatingType: '',
    seatCount: 0,
    lastMaintance: '',
    onService: '',
  };
  constructor() { }

  ngOnInit(): void {
  }

}
