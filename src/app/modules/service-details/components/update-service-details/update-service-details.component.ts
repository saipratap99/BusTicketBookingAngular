import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ServiceDetailsService } from '../../services/service-details.service';

@Component({
  selector: 'app-update-service-details',
  templateUrl: './update-service-details.component.html',
  styleUrls: ['./update-service-details.component.css']
})
export class UpdateServiceDetailsComponent implements OnInit {

  id!: number;
  serviceDetailsResponse!: any;
  serviceDetails!: any;
  constructor(private route: ActivatedRoute, private serviceDetailsService: ServiceDetailsService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.fetchServiceDetails();
    })
  }

  fetchServiceDetails(){
    this.serviceDetailsService.serviceDetailsRead(this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.serviceDetailsResponse = data;
          this.serviceDetails = {
            serviceNumber: this.serviceDetailsResponse?.serviceNumber,
            serviceType: this.serviceDetailsResponse?.serviceType,
            distance: this.serviceDetailsResponse?.distance,
            departureLocation: this.serviceDetailsResponse?.departureLocation?.locationName,
            arrivalLocation: this.serviceDetailsResponse?.arrivalLocation?.locationName
          }
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err)).error?.msg, status: "danger", show: true });
        }
      })
  }

}
