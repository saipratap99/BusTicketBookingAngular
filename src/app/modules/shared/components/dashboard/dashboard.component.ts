import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  operatorName: string = 'Admin';
  bookingStats!: any;
  busStats!: any;
  serviceStats!: any;
  scheduleStats!: any;
  userStats!: any;

  constructor(private dashboardService: DashboardService, public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isOperator())
      this.fetchOperatorName();
    this.fetchBookingStats();
    this.fetchBusStats();
    this.fetchServiceStats();
    this.fetchScheduleStats();
    if(this.authService.isAdmin())
      this.fetchUserStats();
  }

  fetchOperatorName(){
    this.dashboardService.getOperatorName()
      .subscribe({
        next: data => this.operatorName = JSON.parse(JSON.stringify(data)).operatorName
      })
  }

  fetchBookingStats(){
    this.dashboardService.getBookingStats()
      .subscribe({
        next: data => this.bookingStats = data
      })
  }

  fetchBusStats(){
    this.dashboardService.getBusStats()
      .subscribe({
        next: data => this.busStats = data
      })
  }

  fetchServiceStats(){
    this.dashboardService.getServiceStats()
      .subscribe({
        next: data => this.serviceStats = data
      })
  }

  fetchScheduleStats(){
    this.dashboardService.getScheduleStats()
      .subscribe({
        next: data => this.scheduleStats = data
      })
  }

  fetchUserStats(){
    this.dashboardService.getUserStats()
      .subscribe({
        next: data => this.userStats = data
      });
  }
}
