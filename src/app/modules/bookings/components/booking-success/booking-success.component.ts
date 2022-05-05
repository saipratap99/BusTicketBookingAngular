import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { BookingService } from '../../services/booking.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {

  id!: number;
  bookingDetails: any = undefined;
  successIcon = faCheckCircle;

  constructor(private route: ActivatedRoute, private bookingService: BookingService, private msgCommunicationService: MsgCommunicationService){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('bookingId'));
      this.bookingService.confirmBooking(this.id)
        .subscribe({
          next: (data) => this.bookingDetails = data,
          error: (err) => {
            this.msgCommunicationService.msgEvent.emit({msg: err.error.msg, status: "danger", show: true})
          }
        })
      
    })
  }

}
