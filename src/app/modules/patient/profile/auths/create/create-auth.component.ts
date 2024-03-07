import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss']
})
export class CreateAuthComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  create(){
    this.changeVisibility.emit('close');
  }
}
