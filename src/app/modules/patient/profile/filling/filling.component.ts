import { Component, OnInit } from '@angular/core';
import usersData from '../../../patient/list/_data';
@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {

  sestionFlag: string = "history";

  details_visible = Object.create({});
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

}
