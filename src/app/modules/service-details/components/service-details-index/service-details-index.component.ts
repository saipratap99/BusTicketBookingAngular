import { Component, OnInit } from '@angular/core';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ServiceDetailsService } from '../../services/service-details.service';

@Component({
  selector: 'app-service-details-index',
  templateUrl: './service-details-index.component.html',
  styleUrls: ['./service-details-index.component.css']
})
export class ServiceDetailsIndexComponent implements OnInit {

  serviceDetails: any[] = []; 
  constructor(private serviceDetailsService: ServiceDetailsService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.fetchAllServices();
  }

  fetchAllServices(){
    this.serviceDetailsService.getAllServiceDetails()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.serviceDetails = data;
      },
      error: (err) => {
        console.log(err);
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: "danger", show: true });
      }
    })
  }

}
