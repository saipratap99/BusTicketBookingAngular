import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MsgCommunicationService } from '../../services/msg-communication.service';

@Component({
  selector: 'app-toast-bar',
  templateUrl: './toast-bar.component.html',
  styleUrls: ['./toast-bar.component.css']
})
export class ToastBarComponent implements OnInit {

  show: boolean = false;
  msg!: string;
  status!: string;

  // @Output() passMsg = new EventEmitter();
  constructor(private msgCommunicationService: MsgCommunicationService) { 
  }

  ngOnInit(): void {
    this.msgCommunicationService.msgEvent.subscribe(toastBarMsg => {
      this.show = toastBarMsg.show;
      this.msg = toastBarMsg.msg;
      this.status = toastBarMsg.status;
      setTimeout(() => {
        this.closeToastBar();
      }, 10000);
    })

    
  }

  closeToastBar(){
    this.show = false;
  }



}
