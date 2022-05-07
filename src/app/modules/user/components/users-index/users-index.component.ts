import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgCommunicationService } from 'src/app/modules/shared/services/msg-communication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  users: any[] = [];
  constructor(private router: Router, private userService: UserService, private msgCommunicationService: MsgCommunicationService) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }


  fetchAllUsers(){
    this.userService.getAllUsers()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (err) => {
        console.log(err);
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: "danger", show: true });
      }
    })
  }

  alterRole(id: number, role: string){
    this.userService.alterRole(id, role)
      .subscribe({
      next: (data) => {
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(data)).msg, status: "success", show: true });
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
        this.msgCommunicationService.msgEvent.emit({ msg: JSON.parse(JSON.stringify(err))?.error?.msg, status: "danger", show: true });
      }
    })
  }



}
