import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../models/location.model';
import { FilterStatus } from '../../models/filter.model';
import { BookingService } from '../../services/booking.service';
import { faArrowRight, faSortAmountUpAlt, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.css']
})
export class AvailableBusesComponent implements OnInit {


  departureLocation!: Location;
  arrivalLocation!: Location;
  date!: string | null;
  
  ascIcon = faSortAmountUpAlt;
  descIcon = faSortAmountDown;
  rightArrow = faArrowRight;

  sortStatus = {
    isPriceSortedInAsc: false,
    isDepartureTimeSortedInAsc: false,
    isArrivalTimeSortedInAsc: false
  }

  filterStatus: FilterStatus = {
    busType: [],
    seatingType: [],
    price: [0, 0]
  }

  busTypes = ['AC', 'Non-AC'];
  seatingTypes = ['Sleeper', 'Semi Sleeper'];

  availableBusesResponse: any[] = []; 
  availableBuses: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  
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
      .subscribe(response => {
        this.availableBusesResponse = response;
        this.availableBuses = response;
        this.sortByPrice();
        this.sortByDepartureTime();
        this.sortByArrivalTime();
        this.findMinAndMaxPrice();
      });
  }

  getSeatLayout(scheduleId: any, busId: any, departureTime: any){
    this.router.navigate([`/seats/schedule/${scheduleId}/bus/${busId}/${this.date}/${departureTime}`])
  }

  sortByPrice(){

    this.availableBuses.sort((bus1, bus2) => bus1.basePrice - bus2.basePrice);
    if(this.sortStatus.isPriceSortedInAsc)
      this.availableBuses.reverse();
    
    this.sortStatus.isPriceSortedInAsc = !this.sortStatus.isPriceSortedInAsc;

  }

  sortByDepartureTime(){
    this.availableBuses.sort((bus1, bus2) => Date.parse(this.date + ' ' + bus1.departureTime) - Date.parse(this.date + ' ' + bus2.departureTime));
    if(this.sortStatus.isDepartureTimeSortedInAsc)
      this.availableBuses.reverse();
    

    this.sortStatus.isDepartureTimeSortedInAsc = !this.sortStatus.isDepartureTimeSortedInAsc;
  }

  sortByArrivalTime(){
    this.availableBuses.sort((bus1, bus2) => (Date.parse(this.date + ' ' + bus1.departureTime) + bus1.duration * 60 * 1000) - (Date.parse(this.date + ' ' + bus2.departureTime) + bus1.duration * 60 * 1000));
    if(this.sortStatus.isArrivalTimeSortedInAsc)
      this.availableBuses.reverse();
    
    this.sortStatus.isArrivalTimeSortedInAsc = !this.sortStatus.isArrivalTimeSortedInAsc;
  }

  findMinAndMaxPrice(){
    if(this.availableBusesResponse.length == 0)
      return;
    this.minPrice = this.availableBusesResponse[0].basePrice;
    this.maxPrice = this.availableBusesResponse[0].basePrice;
    for(let bus of this.availableBusesResponse){
      if(bus.basePrice > this.maxPrice)
        this.maxPrice = bus.basePrice;
      if(bus.basePrice < this.minPrice)
        this.minPrice = bus.basePrice;
    }
  }

  onBusTypeChange(isChecked: boolean, busType: string){
   if(isChecked)
      this.filterStatus.busType.push(busType);
    else{
      if(this.filterStatus.busType.includes(busType))
        this.filterStatus.busType.splice(this.filterStatus.busType.indexOf(busType), 1);
  
    }
    
    this.filterByBusType(this.filterStatus.busType.length == 0 ? this.busTypes : this.filterStatus.busType);
  }

  onSeatingTypeChange(isChecked: boolean, seatingType: string){
    if(isChecked)
      this.filterStatus.seatingType.push(seatingType);
    else{
      if(this.filterStatus.seatingType.includes(seatingType))
        this.filterStatus.seatingType.splice(this.filterStatus.seatingType.indexOf(seatingType), 1);
    }  
    
    this.filterBySeatingType(this.filterStatus.seatingType.length == 0 ? this.seatingTypes : this.filterStatus.seatingType);
  }

  filterByBusType(busTypes: string[]){
    this.availableBuses = this.availableBusesResponse.filter(bus => busTypes.includes(bus.busDetails.busType));
  }

  filterBySeatingType(seatingTypes: string[]){
    this.availableBuses = this.availableBusesResponse.filter(bus => seatingTypes.includes(bus.busDetails.seatingType.seating));
  }
}
