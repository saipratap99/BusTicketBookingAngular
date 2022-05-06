import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-service-details',
  templateUrl: './new-service-details.component.html',
  styleUrls: ['./new-service-details.component.css']
})
export class NewServiceDetailsComponent implements OnInit {

  serviceDetails: any = {
    serviceNumber: '',
    serviceType: '',
    distance: 0,
    departureLocation: '',
    arrivalLocation: ''
  } 
  
  constructor() { }

  ngOnInit(): void {
  }

}
