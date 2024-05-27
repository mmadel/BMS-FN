import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchClientPaymentComponent } from './bcp/batch-client-payment.component';
import { ClientBalanceComponent } from './client.balance/client-balance.component';

import {
  BatchInsurnacePaymentComponent,
  ElectronicRemittanceAdviceComponent
} from './index';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bip',
        component: BatchInsurnacePaymentComponent,
        data: {
          title: 'Batch Insurnace Payment',
        },
      },
      {
        path: 'bcp',
        component: BatchClientPaymentComponent,
        data: {
          title: 'Batch Client Payment',
        },
      },
      {
        path: 'balance',
        component: ClientBalanceComponent,
        data: {
          title: 'Client Balance',
        },
      },
      {
        path: 'era',
        component: ElectronicRemittanceAdviceComponent,
        data: {
          title: 'Electronic Remittance Advice',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostingRoutingModule { }
