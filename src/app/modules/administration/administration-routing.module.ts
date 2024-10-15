import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrganizationComponent } from './component/organization/create/create.organization.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CreateOrganizationComponent,
        data: {
          title: 'Setup Organization',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
