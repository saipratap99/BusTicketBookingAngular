import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast-bar',
  templateUrl: './toast-bar.component.html',
  styleUrls: ['./toast-bar.component.css']
})
export class ToastBarComponent implements OnInit {

  @Input('show') show!: boolean;
  @Input('msg') msg!: string;
  @Input('status') status!: string;

  // @Output() passMsg = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  closeToastBar(){
    this.show = false;
  }



}
