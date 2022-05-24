import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  allSuccessbookingDetails: any[] = [];

  title!: string;
  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.router.url === '/bookings/all'){
      this.title = 'All Bookings'
      this.bookingService.getAllBookings()
      .subscribe({
        next: (data) => this.allSuccessbookingDetails = data
      })
    }else{
      this.title = 'My Bookings'
      this.bookingService.getAllMyBookings()
      .subscribe({
        next: (data) => this.allSuccessbookingDetails = data
      })
    }
    
  }

}
