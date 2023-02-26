import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
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
        path: 'list',
        component: InvoicingAreaComponent,
        data: {
          title: 'Invoice Area',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
