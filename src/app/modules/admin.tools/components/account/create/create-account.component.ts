import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

}
