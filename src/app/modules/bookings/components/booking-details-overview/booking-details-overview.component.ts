import { Component, Input, OnInit } from '@angular/core';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-details-overview',
  templateUrl: './booking-details-overview.component.html',
  styleUrls: ['./booking-details-overview.component.css']
})
export class BookingDetailsOverviewComponent implements OnInit {

  @Input() bookingDetails!: any;

  rightArrowIcon = faArrowRight;
  constructor() { }

  ngOnInit(): void {
  }

}
