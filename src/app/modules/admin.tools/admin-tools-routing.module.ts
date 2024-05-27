import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccountsComponent } from './components/account/list/list-accounts.component';
import { GroupComponent } from './components/group/group.component';
import { InsuranceMappingComponent } from './components/insurance.company/mapping/insurance-mapping.component';

const routes: Routes = [{
  path: '',
    data: {
      title: 'Admin Tools',
    },
    children:[
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Group Information',
        },
      },
      {
        path: 'insurance/company/mapping',
        component: InsuranceMappingComponent,
        data: {
          title: 'Insurance Mapping',
        },
      },
      {
        path: 'accounts',
        component: ListAccountsComponent,
        data: {
          title: 'Insurance Mapping',
        },
      },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminToolsRoutingModule { }
