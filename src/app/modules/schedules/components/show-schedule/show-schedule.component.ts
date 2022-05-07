import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.css']
})
export class ShowScheduleComponent implements OnInit {

  id!: number;
  scheduleRespone!: any;
  schedule!: any;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.fetchScheduleDetails();
    })
  }

  fetchScheduleDetails(){
    this.scheduleService.scheduleDetailsRead(this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.scheduleRespone = data;
          this.schedule = {
            id: this.scheduleRespone?.id,
            basePrice: this.scheduleRespone?.basePrice,
            weekDay: this.scheduleRespone?.weekDay,
            departureTime: this.scheduleRespone?.departureTime,
            busId: this.scheduleRespone.busDetails.id,
            serviceName: this.scheduleRespone?.serviceDetails?.serviceName,
            duration: this.getDurationInHH_MM(this.scheduleRespone?.duration)
          }
          console.log(this.schedule);
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err)).error.msg, status: "danger", show: true });
        }
      })
  }

  getDurationInHH_MM(minutes: number): string{
    let HH:string = String(Math.floor(minutes / 60));
    let MM:string = String(minutes % 60);

    if(HH.length == 1)
      HH = '0' + HH;
    
    if(MM.length == 1)
      MM = '0' + MM;
      
    return HH + ':' + MM;
  }

}
