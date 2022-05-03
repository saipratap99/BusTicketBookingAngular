import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, pipe} from 'rxjs';
import { switchMap , filter} from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { Location } from '../../models/location.model';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';

@Component({
  selector: 'app-search-buses',
  templateUrl: './search-buses.component.html',
  styleUrls: ['./search-buses.component.css']
})
export class SearchBusesComponent implements OnInit {

  form!: FormGroup 

  @Input() selectedDepartureLocation!: Location
  @Input() selectedArrivalLocation!: Location
  @Input() selectedDate!: string | null

  departureLocations!: any[]; 
  arrivalLocations!: any[];
  date!: string | null

  constructor(private bookingService: BookingService, private router: Router, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      departureLocation: new FormControl(""),
      arrivalLocation: new FormControl(""),
      date: new FormControl("")
    })
    this.searchLocation();

    if(this.selectedArrivalLocation){
      this.form.get('departureLocation')?.setValue(this.selectedDepartureLocation.locationName);
      this.form.get('arrivalLocation')?.setValue(this.selectedArrivalLocation.locationName);
      this.form.get('date')?.setValue(this.selectedDate)

      this.arrivalLocations?.push(this.selectedArrivalLocation);
      this.departureLocations?.push(this.selectedDepartureLocation);
      this.date = this.selectedDate

    }
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
      .subscribe({
        next: locations => {
          this.departureLocations = locations;
          console.log(this.departureLocations)
        },
        error: (err) => {
          if(err.status == 0)
            this.msgCommunicationService.msgEvent.emit({msg: "Unable to connect with Api", status: "danger", show: true});
        }
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
      .subscribe({
        next: locations => {
          this.arrivalLocations = locations;
          console.log(this.arrivalLocations)
        },
        error: (err) => {
          if(err.status == 0)
            this.msgCommunicationService.msgEvent.emit({msg: "Unable to connect with Api", status: "danger", show: true});
        }
      })
  }

  getBuses(){
    if(this.arrivalLocations.length == 1 && this.departureLocations.length == 1 && this.form.valid){
      this.date = this.form.get('date')?.value;
      this.router
      this.router.navigate([`bookings/search/${this.departureLocations[0].locationName}/${this.departureLocations[0].id}/${this.arrivalLocations[0].locationName}/${this.arrivalLocations[0].id}/${this.date}`])
    }else if(this.departureLocations.length != 1)
      this.msgCommunicationService.msgEvent.emit({msg: "Invalid departure location", status: "danger", show: true});
    else if(this.arrivalLocations.length != 1)
      this.msgCommunicationService.msgEvent.emit({msg: "Invalid arrival location", status: "danger", show: true});
  }
}


