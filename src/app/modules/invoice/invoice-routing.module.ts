import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  InsuranceSessionListComponent,
  InvoicingAreaComponent
} from './index'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Invoice',
    },
    children: [
      {
        path: 'client/list',
        component: InvoicingAreaComponent,
        data: {
          title: 'Clients',
        },
      },
      {
        path: 'session/list/:patientId',
        component: InsuranceSessionListComponent,
        data: {
          title: 'sessions',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
