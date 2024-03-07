import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/modules/model/clinical/patient';

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
  createAutVisibility:boolean= false;
  @Input() patient:Patient;
  constructor() { }

  ngOnInit(): void {
    this.calendarDate = Date.now();
  }
  toggleCreateAuthVisibility(){
    this.createAutVisibility =!this.createAutVisibility;
  }
  creatAuth(){
    this.createAutVisibility = true;
  }
  changeVisibility(event:any){
    if(event === 'close' )
      this.toggleCreateAuthVisibility();
  }
}
