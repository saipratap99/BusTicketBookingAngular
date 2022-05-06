import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ServiceDetailsService } from '../../services/service-details.service';

@Component({
  selector: 'app-service-details-form',
  templateUrl: './service-details-form.component.html',
  styleUrls: ['./service-details-form.component.css']
})
export class ServiceDetailsFormComponent implements OnInit {

  serviceDetailsForm!: FormGroup;
  locations: any[] = [];
  serviceTypes: string[] = ['Non-Stop', 'Super fast', 'Express'];  
  loading: boolean = false;
  @Input() type!: string;
  @Input() id!: number
  @Input() serviceDetails: any;
  disabled: boolean = false;

  constructor(private serviceDetailsService: ServiceDetailsService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchLocations();
    if(this.type === 'show'){
      this.serviceDetailsForm.disable();
      this.disabled = true
    }
  }

  buildForm(){
    this.serviceDetailsForm = new FormGroup({
      serviceNumber: new FormControl(this.serviceDetails?.serviceNumber, [Validators.required]),
      serviceType: new FormControl(this.serviceDetails?.serviceType, [Validators.required, Validators.min(3)]),
      distance: new FormControl(this.serviceDetails?.distance, [Validators.required, Validators.min(10)] ),
      departureLocation: new FormControl(this.serviceDetails?.departureLocation, [Validators.required, Validators.min(3)]),
      arrivalLocation: new FormControl(this.serviceDetails?.arrivalLocation, [Validators.required, Validators.min(3)]),
    });
  }

  fetchLocations(){
    this.serviceDetailsService.getAllLocations()
      .subscribe({
        next: (data) => {
          this.locations = data;
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: "danger", show: true });
        }
      })
  }

  onSubmit(){
    this.loading = true;
    if(this.serviceDetailsForm.valid){
      this.serviceDetailsService.serviceDetailsCreateAndUpdate(this.serviceDetailsForm.value, this.type, this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          let action = this.type === 'create' ? 'added' : 'updated'
          this.msgCommunicationService.msgEvent.emit({msg: `Service details ${action} ${JSON.parse(JSON.stringify(data)).serviceName}`, status: 'success', show: true});
          this.serviceDetailsForm.reset;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: err.error.msg, status: 'danger', show: true});
          this.loading = false;
        } 
      })
    }
  }

}
