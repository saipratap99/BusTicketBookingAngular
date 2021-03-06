import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatsService } from '../../services/seats.service';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';

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
  availableSeats!: number;

  busId!: number;
  busDetails!: any;

  scheduleId!: number;
  scheduleDetails!: any;

  steering: any = faCircleDot 
  
  constructor(private route: ActivatedRoute, private seatService: SeatsService, private router: Router, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.busId = Number(params.get('busId'));
      this.scheduleId = Number(params.get('scheduleId'))
      this.fetchSeatsFromService();
      this.getScheduleDetails();
    })
    
  }

  fetchSeatsFromService(){
    const paramMap = this.route.snapshot.paramMap;
    this.seatService.getAvailableSeats(Number(paramMap.get('scheduleId')),Number(paramMap.get('busId')), paramMap.get('date'), paramMap.get('time'))
      .subscribe({
        next: (data) => {
          this.seats = data;
          console.log(this.seats)
          this.seperateSeatsByRows();
          this.getAvailableSeatCount();
        },
        error: (err) => {
          this.msgCommunicationService.msgEvent.emit({msg: err.error.msg, status: "danger", show: true});
        }
    })

  }

  seperateSeatsByRows(){
    this.seatsByRow = new Map();
    for(let seat of this.seats){
      
      seat.isSelected = false;
      
      if(!this.seatsByRow.has(seat.seatRow))
        this.seatsByRow.set(seat.seatRow,[]);

      // adds empty seat / object  
      while(seat.seatCol != this.seatsByRow.get(seat.seatRow).length + 1)
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

  onChange(seatId: any, isChecked: boolean, seatRow: number, seatCol: number){
    if(isChecked){
      let seat = this.seatsByRow.get(seatRow)[seatCol - 1];
      if(this.seatsSelected.length > 5){
        this.msgCommunicationService.msgEvent.emit({msg: 'You can select maximum of 6 seats', status: 'danger', show: true});
        let checkBox = document.querySelector(`#${seat?.seatName}`) as HTMLInputElement;
        if(checkBox)
          checkBox.checked = false;
      }else{
        this.seatsSelected.push(seatId);
        seat.isSelected = true;
      }
    }else{
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

    // - replaced with : in time param
    model.time = model.time.replaceAll('-',':');
    
    this.seatService.bookSelectedSeats(model)
      .subscribe({  
        next: (data) => {
          this.router.navigate([`/bookings/confirm/${data.bookingId}`])
        },
        error: (err) => {console.log(err)},
        complete: () => {
          this.loading = false;
        }
      })

  }

  getAvailableSeatCount(){
    this.availableSeats = this.seats.reduce((prevValue, seat) => prevValue += seat.booked ? 0 : 1, 0);
  }

  getBusDetails(){
    this.seatService.busDetailsRead(this.busId).subscribe({
      next: (data) => {
        this.busDetails = data;
        console.log(this.busDetails);
      }
    })
  }

  getScheduleDetails(){
    this.seatService.scheduleDetailsRead(this.scheduleId).subscribe({
      next: (data) => {
        this.scheduleDetails = data;
        console.log(this.scheduleDetails);
      }
    })
  }
}

