import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  id!: number; 
  bookingDetails: any = undefined;
  loading: boolean = false; 

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) { }

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
    this.loading = true;
    this.bookingService.confirmBooking(this.id).subscribe({
      next: (data) => {
        this.router.navigate(['bookings/success', this.id]);
      },
      error: (err) => {},
      complete: () => {}
    });
  }

}
