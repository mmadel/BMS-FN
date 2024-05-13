import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import patient components
import {
  PatientListComponent,
  PatientProfileComponent,
} from './index'
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PatientListComponent,
        data: {
          title: 'Patient List',
        },
      },
      {
        path: 'profile',
        component: PatientProfileComponent,
        data: {
          title: 'Patient Profile',
        },
      },
      {
        path: 'profile/:id',
        component: PatientProfileComponent,
        data: {
          title: 'Patient Profile',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
