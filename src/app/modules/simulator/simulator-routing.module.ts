import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPayerComponent } from './components/landing/landing-payer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payer',
    },
    children: [
      {
        path: '',
        component: LandingPayerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulatorRoutingModule { }
