import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.css']
})
export class DeleteScheduleComponent implements OnInit {

  id!: number;
  loading:  boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private msgCommunicationService: MsgCommunicationService, private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
  }

  deleteSchedule(scheduleId: number){
    this.loading = true
    this.scheduleService.deleteSchedule(scheduleId).subscribe({
      next: (data) => {
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(data)).msg, status: "success", show: true });
        this.router.navigate(['/schedules']);
      },
      complete: () => this.loading = false
    })  
  }


}
