import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currPage: string = 'Home'

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logOutUser(){
    this.currPage = 'Home';
    this.authService.logOut();
  }

  setActive(page: string){
    this.currPage = page;
  }

  

}
