import { Component, Input, OnInit } from '@angular/core';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';

@Component({
  selector: 'enter-payment',
  templateUrl: './enter-payment.component.html',
  styleUrls: ['./enter-payment.component.scss']
})
export class EnterPaymentComponent implements OnInit {
  @Input() session: PatientSession;
  constructor() { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.session))
  }

}
