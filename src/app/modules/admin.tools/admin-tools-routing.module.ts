import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';

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
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminToolsRoutingModule { }
