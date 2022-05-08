import { Component, OnInit } from '@angular/core';
import { SeatsService } from '../../services/seats.service';

@Component({
  selector: 'app-seating-types',
  templateUrl: './seating-types.component.html',
  styleUrls: ['./seating-types.component.css']
})
export class SeatingTypesComponent implements OnInit {

  seatingTypes: any[] = [];

  constructor(private seatsService: SeatsService) { }

  ngOnInit(): void {
    this.fetchAllSeatingTypes();
  }

  fetchAllSeatingTypes(){
    this.seatsService.getAllSeatingTypes()
      .subscribe({
        next: (data) => {
          this.seatingTypes = data;
          console.log(this.seatingTypes)
        }
      })
  }
}
