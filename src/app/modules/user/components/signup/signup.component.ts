import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

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

  // toastBar Attributes
  msg!: string;
  status!: string;
  show!: boolean ;

  // @Output('passMsg') passMsg = new EventEmitter<any>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.userForm.valid){
      console.log("Form submitted");
      this.userService.createUser(this.model)
        .subscribe({
          next: (v) => {
            console.log(v);
            this.msg = JSON.parse(JSON.stringify(v)).firstName; 
            this.status = 'success';
            this.show = true;
            // this.passMsg.emit({msg: JSON.parse(JSON.stringify(v)).firstName, status: "success", show: true})
          },

          error: (err) => {
            console.log(err);
            this.msg = JSON.parse(JSON.stringify(err)).error; 
            this.status = 'danger';
            this.show = true;
            // this.passMsg.emit({msg: "Error creating", status: "danger", show: true});
          },

          complete: () => {
            console.log("Done")
            this.userForm.reset();
          }
        })
    }
  } 
}