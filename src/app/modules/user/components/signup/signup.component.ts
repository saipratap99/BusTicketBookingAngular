import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';

import { Signup } from '../../models/signup.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('userform') userForm: any;
  model: Signup = new Signup();

  constructor(private userService: UserService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.userForm.valid){
      console.log("Form submitted");
      this.userService.createUser(this.model)
        .subscribe({
          next: (v) => {
            console.log(v);
            this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(v)).firstName + ' has been added!', status: 'success', show: true});
          },

          error: (err) => {
            console.log(err);
          },

          complete: () => {
            console.log("Done")
            this.userForm.reset();
          }
        })
    }
  } 
}