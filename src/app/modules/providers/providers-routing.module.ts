import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListComponent,
  ReferringProviderListComponent
} from './index'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Providers',
    },
    children :[
      {
        path: 'providerlist',
        component: ListComponent,
        data: {
          title: 'Provider list',
        },
      },
      {
        path: 'referringproviders',
        component: ReferringProviderListComponent,
        data: {
          title: 'Referring Providers',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
