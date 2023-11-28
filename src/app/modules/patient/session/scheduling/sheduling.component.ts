import { Component, Input, OnInit } from '@angular/core';
import { SessionScheduling } from '../model/session.scheduling';

@Component({
  selector: 'app-sheduling',
  templateUrl: './sheduling.component.html',
  styleUrls: ['./sheduling.component.scss']
})
export class ShedulingComponent implements OnInit {
  @Input() sessionScheduling: SessionScheduling;
  constructor() { }

  ngOnInit(): void {
  }

}
