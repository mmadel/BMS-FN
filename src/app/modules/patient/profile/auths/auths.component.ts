import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.scss']
})
export class AuthsComponent implements OnInit {
  public date = new Date();
  public calendarDate = Date.now();
  public startDate?: Date | null = new Date(new Date().setDate(this.date.getDate() + 1));
  public endDate?: Date | null = new Date(new Date().setDate(this.date.getDate() + 3));
  constructor() { }

  ngOnInit(): void {
    this.calendarDate = Date.now();
  }

}
