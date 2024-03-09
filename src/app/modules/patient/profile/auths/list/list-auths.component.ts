import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-auths',
  templateUrl: './list-auths.component.html',
  styleUrls: ['./list-auths.component.scss']
})
export class ListAuthsComponent implements OnInit {
  @Input() patientId: number
  constructor() { }

  ngOnInit(): void {
    console.log(this.patientId)
  }

}
