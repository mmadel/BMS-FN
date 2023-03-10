import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import patient components
import {
  PatientListComponent,
  PatientProfileComponent,
  PatientSessionComponent
} from './index'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patient',
    },
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
        path: 'session',
        component: PatientSessionComponent,
        data: {
          title: 'Patient Session',
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
