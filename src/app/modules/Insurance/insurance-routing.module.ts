import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  InsuranceListComponent
} from './index'
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: InsuranceListComponent,
        data: {
          title: 'Insurance List',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
