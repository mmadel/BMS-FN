import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import compoenets
import {
  FeeScheduleComponent,
  CancelClaimComponent,
  ModifierRuleComponent
} from './index'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tools',
    },
    children: [
      {
        path: 'fee-schedule',
        component: FeeScheduleComponent,
        data: {
          title: 'Fee Schedule',
        },
      },
      {
        path: 'cancel-claims',
        component: CancelClaimComponent,
        data: {
          title: 'Cancel Claims',
        },
      },
      {
        path: 'modifier-rules',
        component: ModifierRuleComponent,
        data: {
          title: 'Modifier Rules',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
