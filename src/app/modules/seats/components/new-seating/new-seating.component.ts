import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { SeatsService } from '../../services/seats.service';

@Component({
  selector: 'app-new-seating',
  templateUrl: './new-seating.component.html',
  styleUrls: ['./new-seating.component.css']
})
export class NewSeatingComponent implements OnInit {

  seats!: any;
  seatingType!: any;
  rows: number[] = [];
  cols: number[] = [];
  loading: boolean = false;


  constructor(private seatsService: SeatsService, private msgCommunicationService: MsgCommunicationService, private router: Router) { }

  ngOnInit(): void {
  }

  generateLayout(seating: string, rowsInput: string, colsInput: string){
    
    this.seatingType = seating;

    let rows = Number(rowsInput);
    let cols = Number(colsInput);
    
    for(let i = 0; i < rows; i++)
      this.rows[i] = i;
    
    for(let i = 0; i < cols; i++)
      this.cols[i] = i;

    console.log(seating, rows, cols);
    
    if(rows >= 3 && cols >= 3){
      this.seats = new Map();

      for(let i = 0; i < rows;  i++){
        this.seats.set(i, []);
        for(let j = 0; j < cols; j++){
          let seat = {
            row: i + 1,
            col: j + 1,
            seatName: ''  
          }
          this.seats.get(i).push(seat);
        }
      }

      console.log(this.seats);
    }
  }

  onSubmit(){
    this.loading = true;
    let seats: any[] = [];

    for(let row of this.rows)
      for(let col of this.cols)
        seats.push(this.seats.get(row)[col]);

    let requestBody: any = {
      seatingType: this.seatingType,
      seats: seats
    }

    let confirmed = confirm("Are you sure to save the layout?")

    if(seats.length > 0 && confirmed){
      console.log(requestBody);
      this.seatsService.createNewSeatLayout(requestBody)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(data))?.msg, status: "success", show: true })
            this.router.navigate(['/seats/new']);
            this.loading = false
          },
          error: (err) => {
            this.loading= false;
          }
        })
    }else
      this.loading = false;
  }


  onChange(){
    console.log(this.seats);
  }


}
