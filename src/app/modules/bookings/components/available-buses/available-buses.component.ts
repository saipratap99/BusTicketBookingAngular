import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../models/location.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.css']
})
export class AvailableBusesComponent implements OnInit {


  departureLocation!: Location;
  arrivalLocation!: Location;
  date!: string | null;

  availableBuses: any[] = []

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setDetails();
      this.fetchBuses();
    })
    
  }

  setDetails(){
    const paramMap = this.route.snapshot.paramMap;
    this.departureLocation = {id: paramMap.get('depId'), locationName: paramMap.get('depLocation')}
    this.arrivalLocation = {id: paramMap.get('arrId'), locationName: paramMap.get('arrLocation')}
    this.date = paramMap.get('date')
    // console.log(this.departureLocation)
  }

  fetchBuses(){
    this.bookingService.getBuses(this.departureLocation, this.arrivalLocation, this.date)
      .subscribe(response => {this.availableBuses = response;});
  }

  getSeatLayout(scheduleId: any, busId: any, departureTime: any){
    this.router.navigate([`/seats/schedule/${scheduleId}/bus/${busId}/${this.date}/${departureTime}`])
  }
}
