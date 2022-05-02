import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  id!: number; 
  bookingDetails: any = undefined
  constructor(private route: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = Number(params.get('bookingId'));
      this.fetchBookingDetails();
    })
  }

  fetchBookingDetails(){
    this.bookingService.getBookingDetails(this.id)
      .subscribe({
        next: (data) => {
          this.bookingDetails = data;
          console.log(data)
        },
        error: (err) => console.log(err),
        complete: () => {}
      })
  }

  confirmBooking(){
    
  }

}
