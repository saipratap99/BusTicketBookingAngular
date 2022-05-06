import { Component, OnInit } from '@angular/core';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-bus-index',
  templateUrl: './bus-index.component.html',
  styleUrls: ['./bus-index.component.css']
})
export class BusIndexComponent implements OnInit {

  busDetails: any[] = [];
  constructor(private busService: BusService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.fetchAllBuses();
  }

  fetchAllBuses(){
    this.busService.getAllBusDetails()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.busDetails = data;
      },
      error: (err) => {
        console.log(err);
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err)).error.msg, status: "danger", show: true });
      }
    })
  } 
}
