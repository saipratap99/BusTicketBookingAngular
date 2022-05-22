import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ServiceDetailsService } from '../../services/service-details.service';

@Component({
  selector: 'app-delete-service-details',
  templateUrl: './delete-service-details.component.html',
  styleUrls: ['./delete-service-details.component.css']
})
export class DeleteServiceDetailsComponent implements OnInit {

  id!: number;
  loading:  boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private msgCommunicationService: MsgCommunicationService, private serviceDetailsService: ServiceDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
  }

  deleteService(serviceId: number){
    this.loading = true
    this.serviceDetailsService.deleteService(serviceId).subscribe({
      next: (data) => {
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(data)).msg, status: "success", show: true });
        this.router.navigate(['/buses']);
      },
      complete: () => this.loading = false
    })  
  }


}
