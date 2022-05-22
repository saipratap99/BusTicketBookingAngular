import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css']
})
export class DeleteBusComponent implements OnInit {

  id!: number;
  loading:  boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private msgCommunicationService: MsgCommunicationService, private busService: BusService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
  }

  deleteBus(busId: number){
    this.loading = true
    this.busService.deleteBus(busId).subscribe({
      next: (data) => {
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(data)).msg, status: "success", show: true });
        this.router.navigate(['/buses']);
      },
      complete: () => this.loading = false
    })  
  }


}
