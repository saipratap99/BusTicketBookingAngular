import { EventEmitter, Injectable, Output } from '@angular/core';
import { MessageToToastBar } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MsgCommunicationService {

  @Output() msgEvent: EventEmitter<any> = new EventEmitter(); 
  constructor() { }

  sendMessage(msg: MessageToToastBar){
    this.msgEvent.emit(msg);
  }
}
