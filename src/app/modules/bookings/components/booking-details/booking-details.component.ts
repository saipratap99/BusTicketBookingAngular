import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  allSuccessbookingDetails: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getAllSuccessBookings()
     .subscribe({
       next: (data) => {
         this.allSuccessbookingDetails = data;
        //  console.log(this.allSuccessbookingDetails)
       },
       error: (err) => {}
     })
  }

}
