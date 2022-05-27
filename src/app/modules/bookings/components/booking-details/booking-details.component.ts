import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faSortAmountDown, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  allSallSuccessbookingDetailsResponse: any[] = []; 
  allSuccessbookingDetails: any[] = [];

  ascIcon = faSortAmountUpAlt;
  descIcon = faSortAmountDown;
  rightArrow = faArrowRight;

  sortStatus = {
    isBookedAtSortedInAsc: false,
    isDepartureSortedInAsc: false,
    isArrivalSortedInAsc: false
  }


  title!: string;
  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.router.url === '/bookings/all'){
      this.title = 'All Bookings'
      this.bookingService.getAllBookings()
      .subscribe({
        next: (data) => {
          this.allSallSuccessbookingDetailsResponse = data;
          this.allSuccessbookingDetails = data
        }
      })
    }else{
      this.title = 'My Bookings'
      this.bookingService.getAllMyBookings()
      .subscribe({
        next: (data) => {
          this.allSallSuccessbookingDetailsResponse = data;
          this.allSuccessbookingDetails = data
          console.log(this.allSuccessbookingDetails);
        }
      })
    }
    
  }

  sortByBookedAt(){
    this.allSuccessbookingDetails.sort((booking1, booking2) => new Date(booking1.bookedAt).getTime() - new Date(booking2.bookedAt).getTime());
    if(this.sortStatus.isBookedAtSortedInAsc)
      this.allSuccessbookingDetails.reverse();
    
    this.sortStatus.isBookedAtSortedInAsc = !this.sortStatus.isBookedAtSortedInAsc;

  }

  sortByDeparture(){
    this.allSuccessbookingDetails.sort((booking1, booking2) => new Date(booking1.doj + " " + booking1.time).getTime() - new Date(booking2.doj + " " + booking2.time).getTime());
    if(this.sortStatus.isDepartureSortedInAsc)
      this.allSuccessbookingDetails.reverse();
    
    this.sortStatus.isDepartureSortedInAsc = !this.sortStatus.isDepartureSortedInAsc;

  }
}
