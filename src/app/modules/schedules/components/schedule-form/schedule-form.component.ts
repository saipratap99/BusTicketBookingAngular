import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  scheduleDetailsForm!: FormGroup;
  services: any[] = [];
  buses: any[] = [];
  weeks: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
  loading: boolean = false;
  @Input() type!: string;
  @Input() id!: number
  @Input() schedule!: any;
  disabled: boolean = false;

  constructor(private scheduleService: ScheduleService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchServices();
    this.fetchBuses();
    
    if(this.type === 'show'){
      this.scheduleDetailsForm.disable();
      this.disabled = true
    }
    
  }

  buildForm(){
    this.scheduleDetailsForm = new FormGroup({
      busId: new FormControl(this.schedule?.busId, [Validators.required, Validators.min(1)]),
      serviceName: new FormControl(this.schedule?.serviceName, [Validators.required]),
      basePrice: new FormControl(this.schedule?.basePrice, [Validators.required, Validators.min(30)] ),
      departureTime: new FormControl(this.schedule?.departureTime, [Validators.required]),
      duration: new FormControl(this.schedule?.duration, [Validators.required]),
      weekDay: new FormControl(this.schedule?.weekDay, [Validators.required, Validators.min(1), Validators.max(7)]),
    });
  }

  fetchServices(){
    this.scheduleService.getAllServices()
      .subscribe({
        next: (data) => {
          this.services = data; 
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: 'danger', show: 'true' });
        }
      })
  }

  fetchBuses(){
    this.scheduleService.getAllBuses()
      .subscribe({
        next: (data) => {
          this.buses = data; 
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: 'danger', show: 'true' });
        }
      })
  }

  
  onSubmit(){
    if(this.scheduleDetailsForm.valid){
      this.loading = true;
      this.scheduleService.scheduleDetailsDetailsCreateAndUpdate(this.scheduleDetailsForm.value, this.type, this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          let action = this.type === 'create' ? 'added' : 'updated'
          this.msgCommunicationService.msgEvent.emit({msg: `Schedule details ${action} ${JSON.parse(JSON.stringify(data)).id}`, status: 'success', show: true});
          this.scheduleDetailsForm.reset;
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
