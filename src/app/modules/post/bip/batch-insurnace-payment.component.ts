import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-insurnace-payment',
  templateUrl: './batch-insurnace-payment.component.html',
  styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {
  entity:number=1;
  constructor() { }

  ngOnInit(): void {
  }
  onEntityChange(value:any) {
    this.entity = value.target.value;
}
}
