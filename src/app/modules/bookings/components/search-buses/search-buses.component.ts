import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe} from 'rxjs';
import { switchMap , filter} from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-search-buses',
  templateUrl: './search-buses.component.html',
  styleUrls: ['./search-buses.component.css']
})
export class SearchBusesComponent implements OnInit {

  form!: FormGroup 

  departureLocations: any; 
  arrivalLocations: any;

  date!: string

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      departureLocation: new FormControl(""),
      arrivalLocation: new FormControl(""),
      date: new FormControl("")
    })
    this.searchLocation();
  }

  searchLocation() {
    this.form.get('departureLocation')?.valueChanges
      .pipe(
        filter(location => location.length >= 1),
        debounceTime(800),  
        distinctUntilChanged(), 
        switchMap(locationName => {
          return this.bookingService.getLocation(locationName);
        })
      )
      .subscribe( locations => {
        this.departureLocations = locations;
        console.log(this.departureLocations)
      })

      this.form.get('arrivalLocation')?.valueChanges
      .pipe(
        filter(location => location.length >= 1),
        debounceTime(800),  
        distinctUntilChanged(), 
        switchMap(locationName => {
          return this.bookingService.getLocation(locationName);
        })
      )
      .subscribe( locations => {
        this.arrivalLocations = locations;
        console.log(this.arrivalLocations)
      })
  }
}
