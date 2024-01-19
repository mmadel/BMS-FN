import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Payer } from 'src/app/modules/model/admin/payer';
import { BasicAddress } from 'src/app/modules/model/common/basic.address';
import { PayerService } from '../../service/payer.service';

@Component({
  selector: 'sim-view-payers',
  templateUrl: './view-payers.component.html',
  styleUrls: ['./view-payers.component.scss']
})
export class ViewPayersComponent implements OnInit {
  payers: Payer[]
  constructor(private payerService: PayerService) { }

  ngOnInit(): void {
    this.payerService.list()
      .subscribe((result: any) => {
        this.payers = result;
      })
  }
  public constructAddress(payerAddress: BasicAddress) {
    return payerAddress.address + ' '
      + payerAddress.city + ','
      + payerAddress.state + ' '
      + payerAddress.zipCode;
  }

}
