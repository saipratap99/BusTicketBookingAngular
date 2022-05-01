import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  msg!: string;
  status!: string;
  show: boolean = false;

  title = 'bus-ticket-booking';

  constructor(){}
  setToastBarData($event: any){
    console.log("Pass msg event triggered");
    this.msg = $event.msg;
    this.status = $event.status;
    this.show = $event.show;
  }
}
