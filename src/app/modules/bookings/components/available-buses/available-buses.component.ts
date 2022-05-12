import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../models/location.model';
import { FilterStatus } from '../../models/filter.model';
import { BookingService } from '../../services/booking.service';
import { faArrowRight, faSortAmountUpAlt, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';

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
    busTypes: [],
    seatingTypes: [],
    priceRange: [0, 0]
  }

  busTypes = ['AC', 'Non-AC'];
  seatingTypes = ['Sleeper', 'Semi Sleeper'];

  availableBusesResponse: any[] = []; 
  availableBuses: any[] = [];
  minPrice!: number;
  maxPrice!: number;
  
  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router, private authService: AuthService, private msgCommunicationService: MsgCommunicationService) { }


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
    // if(this.authService.isLoggedIn())
    this.router.navigate([`/seats/schedule/${scheduleId}/bus/${busId}/${this.date}/${departureTime.replaceAll(':','-')}`])
    // else{
    //   this.router.navigate([`/users/login?next=/seats/schedule/${scheduleId}/bus/${busId}/${this.date}/${departureTime}`]);
    //   this.msgCommunicationService.msgEvent.emit({msg: 'Please login to continue', status: 'danger', show: true});
    // }
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

    this.filterStatus.priceRange[0] = this.minPrice;
    this.filterStatus.priceRange[1] = this.maxPrice;

  }

  onBusTypeChange(isChecked: boolean, busType: string){
   if(isChecked)
      this.filterStatus.busTypes.push(busType);
    else{
      if(this.filterStatus.busTypes.includes(busType))
        this.filterStatus.busTypes.splice(this.filterStatus.busTypes.indexOf(busType), 1);
  
    }
    this.filterBusDetails();
    // this.filterByBusType(this.filterStatus.busType.length == 0 ? this.busTypes : this.filterStatus.busType);
  }

  onSeatingTypeChange(isChecked: boolean, seatingType: string){
    if(isChecked)
      this.filterStatus.seatingTypes.push(seatingType);
    else{
      if(this.filterStatus.seatingTypes.includes(seatingType))
        this.filterStatus.seatingTypes.splice(this.filterStatus.seatingTypes.indexOf(seatingType), 1);
    }  
    this.filterBusDetails();
    // this.filterBySeatingType(this.filterStatus.seatingType.length == 0 ? this.seatingTypes : this.filterStatus.seatingType);
  }

  onPriceRangeChange(maxPrice: string){
    this.filterStatus.priceRange[1] = Number(maxPrice);

    // this.filterByPrice(this.filterStatus.price[1]);
    this.filterBusDetails();
  }

  filterByBusType(busTypes: string[]){
    this.availableBuses = this.availableBusesResponse.filter(bus => busTypes.includes(bus.busDetails.busType));
  }

  filterBySeatingType(seatingTypes: string[]){
    this.availableBuses = this.availableBusesResponse.filter(bus => seatingTypes.includes(bus.busDetails.seatingType.seating));
  }

  filterByPrice(maxPrice: number){
    this.filterStatus.priceRange[1] = Number(maxPrice);
    this.availableBuses = this.availableBusesResponse.filter(bus => bus.basePrice <= Number(maxPrice));
  }


  filterBusDetails(){
    this.availableBuses = this.availableBusesResponse.filter( bus => {
      return this.isBusTypePresent(bus.busDetails.busType, this.filterStatus.busTypes)
      && this.isSeatingTypePresent(bus.busDetails.seatingType.seating, this.filterStatus.seatingTypes)
      && this.isBasePriceInGivenPriceRange(bus.basePrice, this.filterStatus.priceRange);
    })
  }
  
  isBusTypePresent(buType: string, busTypes: string[]){
    if(busTypes.length == 0)
      return true;

    return busTypes.includes(buType);
  }

  isSeatingTypePresent(seatingType: string, seatingTypes: string[]){
    if(seatingTypes.length == 0)
      return true;

    return seatingTypes.includes(seatingType);
  }

  isBasePriceInGivenPriceRange(basePrice: number, priceRange: number[]){
    return basePrice >= priceRange[0] && basePrice <= priceRange[1];
  }
}
