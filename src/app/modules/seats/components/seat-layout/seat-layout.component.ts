import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatsService } from '../../services/seats.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {

  seats: any[] = [];
  seatsSelected: number[] = [];
  seatsByRow: any;
  maxRows: number = 0;
  maxCols: number = 0;
  rows: number[] = [];
  cols: number[] = []; 
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private seatService: SeatsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchSeatsFromService();
    })
    
  }

  fetchSeatsFromService(){
    const paramMap = this.route.snapshot.paramMap;
    this.seatService.getAvailableSeats(Number(paramMap.get('scheduleId')),Number(paramMap.get('busId')), paramMap.get('date'), paramMap.get('time'))
      .subscribe({
        next: (data) => {
          this.seats = data;
          this.seperateSeatsByRows();
        },
        error: (err) => {
          console.log(err.error);
        },
        complete: () => {}
    })

  }

  seperateSeatsByRows(){
    this.seatsByRow = new Map();
    for(let seat of this.seats){
      if(!this.seatsByRow.has(seat.seatRow))
        this.seatsByRow.set(seat.seatRow,[]);

      if(seat.seatCol != this.seatsByRow.get(seat.seatRow).length + 1)
        this.seatsByRow.get(seat.seatRow).push({});
      this.seatsByRow.get(seat.seatRow).push(seat);
    }

    this.maxRows = this.seatsByRow.size;
    this.maxCols = this.seatsByRow.get(this.maxRows).length;

    for(let i = 1; i <= this.maxRows; i++)
      this.rows.push(i);
    
      for(let i = 1; i <= this.maxCols; i++)
      this.cols.push(i);
    
    console.log(this.seatsByRow, this.maxRows, this.maxCols);
  }

  onChange(seatId: any, isChecked: boolean ){
    if(isChecked)
      this.seatsSelected.push(seatId);
    else{
      let index = this.seatsSelected.indexOf(seatId);
      if(index >= 0)
        this.seatsSelected.splice(index, 1);
    }
  }

  onProceed(){
    this.loading = true;
    const paramMap = this.route.snapshot.paramMap;
    let model: any = {
      "scheduleId": paramMap.get('scheduleId'),
      "busId": paramMap.get('busId'),
      "date": paramMap.get('date'),
      "time": paramMap.get('time'),
      "selectedSeats": this.seatsSelected
    }

    console.log(model);

    this.seatService.bookSelectedSeats(model)
      .subscribe({  
        next: (data) => {
          this.router.navigate([`/bookings/confirm/${data.bookingId}`])
          console.log(data.bookingId)
          this.loading = false;
        },
        error: (err) => {console.log(err); this.loading = false;},
        complete: () => {}
      })

  }


}

