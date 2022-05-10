import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-bus-details-form',
  templateUrl: './bus-details-form.component.html',
  styleUrls: ['./bus-details-form.component.css']
})
export class BusDetailsFormComponent implements OnInit {

  @Input('busDetails') busDetails!: any;

  busDetailsForm!: FormGroup;
  seatingTypes: any[] = [];
  busTypes: string[] = ['AC', 'Non-AC'];  
  loading: boolean = false;
  @Input() type!: string;
  @Input() id!: number
  disabled: boolean = false;

  constructor(private busService: BusService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.fetchSeatingTypes();
    if(this.type === 'show'){
      this.busDetailsForm.disable();
      this.disabled = true
    }
    
  }

  buildForm(){
    this.busDetailsForm = new FormGroup({
      model: new FormControl(this.busDetails?.model, [Validators.required, Validators.min(2)]),
      busRegNumber: new FormControl(this.busDetails?.busRegNumber, [Validators.required, Validators.min(10)]),
      busType: new FormControl(this.busDetails?.busType, [Validators.required, Validators.min(3)] ),
      seatCount: new FormControl(this.busDetails?.seatCount, [Validators.required, Validators.min(4)]),
      seatingType: new FormControl(this.busDetails?.seatingType?.seating, [Validators.required, Validators.min(3)]),
      onService: new FormControl(this.busDetails?.onService, Validators.required),
      lastMaintance: new FormControl(this.busDetails?.lastMaintance, Validators.required)
    });
  }

  fetchSeatingTypes(){
    this.busService.getAllSeatingTypes()
      .subscribe({
        next: (data) => {
          this.seatingTypes = data; 
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: err?.error, status: 'danger', show: 'true' });
        }
      })
  }

  onSubmit(){
    if(this.busDetailsForm.valid){
      this.loading = true;
      this.busService.busDetailsCreateAndUpdate(this.busDetailsForm.value, this.type, this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          let action = this.type === 'create' ? 'added' : 'updated'
          this.msgCommunicationService.msgEvent.emit({msg: `Bus details ${action} ${JSON.parse(JSON.stringify(data)).busName}`, status: 'success', show: true});
          this.busDetailsForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.msgCommunicationService.msgEvent.emit({msg: err.error.msg, status: 'danger', show: true});
        },
        complete: () => this.loading = false
      })
    }
  }

}


