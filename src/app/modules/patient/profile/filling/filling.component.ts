import { Component, Input, OnInit } from '@angular/core';
import usersData from '../../../patient/list/_data';
@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {
  @Input() pateintId: number;
  sestionFlag: string = "history";
  addSessionVisibility:boolean= false
  constructor() { }

  ngOnInit(): void {
  }
  onClickSessionHistory() {
    this.sestionFlag = 'history'
  }
  onClickCMS() {
    this.sestionFlag = 'cms'
  }
  onClickAttacment() {
    this.sestionFlag = ''
  }
  createSession(){
      this.toggleAddSession();
  }
  toggleAddSession(){
    this.addSessionVisibility = !this.addSessionVisibility
  } 
}
