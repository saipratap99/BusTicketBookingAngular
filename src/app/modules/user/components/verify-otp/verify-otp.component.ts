import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  @ViewChild('verifyOTPForm') verifyOTPForm: any;

  id!: number;
  email!: string | null; 
  loading: boolean = false;
  otp!: number;
  redirectURL: string = '';
  isResendDisabled: boolean = true; 
  remainingTime: number = 60;
  resendLoading: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private msgCommunicationService: MsgCommunicationService) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.fetchEmail();
      this.disableResend();
    })
  }

  fetchEmail(){
    this.userService.getEmail(this.id).subscribe({
      next: (data) => this.email = JSON.parse(JSON.stringify(data)).email
    })
  }

  onVerify(){
    if(this.verifyOTPForm.valid){
      this.loading = true;
      this.userService.verifyOTP(this.id, this.otp)
        .subscribe({
          next: (data) => {
            this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(data)).msg, status: 'success', show: true});
            this.router.navigate([this.redirectURL]);
          },
          complete: () => this.loading = false
        })
    }
    
  }

  onResend(){
    this.resendLoading = true;
    this.userService.resendOTP(this.id).subscribe({
      next: (data) => {
        this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(data)).msg, status: 'success', show: true});
        this.isResendDisabled = true;
        this.disableResend();
      },
      complete: () => this.resendLoading = false
    })
    
  }

  disableResend(){
    this.remainingTime = 60;
    let timerSubscriber = timer(1000, 1000).subscribe(() => this.remainingTime--);

    setTimeout(() => {
      this.isResendDisabled = false;
      timerSubscriber.unsubscribe();
    }, 60000);
  }



}
