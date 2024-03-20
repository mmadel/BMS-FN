import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindHistoryComponent } from './component/list/find-history.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CMS-Filing',
    },
    children: [
      {
        path: 'list',
        component: FindHistoryComponent,
        data: {
          title: 'CMS Filing',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsFilingRoutingModule { }
