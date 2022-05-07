import { Component, OnInit } from '@angular/core';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-index',
  templateUrl: './schedule-index.component.html',
  styleUrls: ['./schedule-index.component.css']
})
export class ScheduleIndexComponent implements OnInit {

  scheduleDetails: any[] = []; 
  constructor(private scheduleService: ScheduleService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.fetchAllServices();
  }
  
  fetchAllServices(){
    this.scheduleService.getAllScheduleDetails()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.scheduleDetails = data;
      },
      error: (err) => {
        console.log(err);
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: "danger", show: true });
      }
    })
  }

}
