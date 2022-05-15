import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading: boolean = false;
  redirectURL!: string | null;

  constructor(private userService: UserService, private msgCommunicationService: MsgCommunicationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.redirectURL = params.get('redirectURL') != null ? params.get('redirectURL') : '';;    
      console.log( this.redirectURL)
    })
  }

  onSubmit(){
    if(this.userForm.valid){
      this.loading = true;
      console.log("Form submitted");
      this.userService.createUser(this.model)
        .subscribe({
          next: (v) => {
            console.log(v);
            this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(v)).firstName + ', please verify email.', status: 'success', show: true});
            this.userForm.reset();
            
            this.router.navigate([`users/${JSON.parse(JSON.stringify(v)).id}/verify/otp`]);
          },

          error: (err) => {
            console.log(err);
          },

          complete: () => {
            console.log("Done");
            this.loading = false;
          }
        })
    }
  } 
}