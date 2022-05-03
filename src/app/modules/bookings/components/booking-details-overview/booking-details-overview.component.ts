import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-details-overview',
  templateUrl: './booking-details-overview.component.html',
  styleUrls: ['./booking-details-overview.component.css']
})
export class BookingDetailsOverviewComponent implements OnInit {

  @Input() bookingDetails!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
