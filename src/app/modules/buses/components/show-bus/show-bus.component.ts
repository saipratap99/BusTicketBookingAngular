import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-show-bus',
  templateUrl: './show-bus.component.html',
  styleUrls: ['./show-bus.component.css']
})
export class ShowBusComponent implements OnInit {
  id!: number;
  busDetails!: any;

  constructor(private route: ActivatedRoute, private busService: BusService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.fetchBusDetails();
    })
  }

  fetchBusDetails(){
    this.busService.busDetailsRead(this.id)
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
