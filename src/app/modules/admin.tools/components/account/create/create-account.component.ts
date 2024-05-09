import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/modules/model/admin/user/user';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  @ViewChild('accountForm') accountForm: NgForm;
  notValidForm: boolean = false
  mode: string = 'create'
  user: User = {};
  constructor() { }

  ngOnInit(): void {
  }
  create() {
    console.log(this.accountForm.valid)
    if (this.accountForm.valid) {
      this.notValidForm = false;
    } else {
      this.notValidForm = true;
    }
  }
}
