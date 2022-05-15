import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MsgCommunicationService } from '../../services/msg-communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currPage: string = 'Home'

  constructor(public authService: AuthService, private msgCommunicationService: MsgCommunicationService, private router: Router) { }

  ngOnInit(): void {
  }

  logOutUser(){
    if(confirm("Are you sure to logout?")){
      this.currPage = 'Home';
      this.authService.logOut().subscribe({
        next: (data) => { 
          this.msgCommunicationService.msgEvent.emit({msg: JSON.parse(JSON.stringify(data)).msg, status: 'success', show: true})
          this.router.navigate(['']);
        }
      });
    }
    

  }

  setActive(page: string){
    this.currPage = page;
  }

  

}
