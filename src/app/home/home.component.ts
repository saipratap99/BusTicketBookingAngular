import { Component, OnInit } from '@angular/core';
import { faSackDollar, faBusAlt, faMoneyCheckAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lowPriceIcon = faSackDollar;
  busIcon = faBusAlt;
  dealsIcon = faMoneyCheckAlt;
  supportIcon = faHeadset;

  constructor() { }

  ngOnInit(): void {
  }

}
