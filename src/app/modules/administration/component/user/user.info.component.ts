import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/modules/model/admin/user/user';

@Component({
  selector: 'user-info',
  templateUrl: './user.info.component.html',
  styleUrls: ['./user.info.component.scss']
})
export class UserInfoComponent implements OnInit {
  notValidForm: boolean = false;
  @ViewChild('userInfoFrom') userInfoFrom: NgForm;
  user:User={};
  constructor() { }

  ngOnInit(): void {
  }

}
