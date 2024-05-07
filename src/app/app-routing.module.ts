import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulatorLayoutComponent } from './availity.simulator/simulator-layout.component';
import { DefaultLayoutComponent } from './core';
import { KcAuthGuard } from './modules/secuirty/guard/kc-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [KcAuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'patient',
        data: {
          title: 'Patient',
          roles: ['patient-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/patient/patient.module').then((m) => m.PatientModule)
      },
      {
        path: 'provider',
        data: {
          title: 'Provider',
          roles: ['provider-role', 'referring-provider-role', 'soild-provider-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/providers/providers.module').then((m) => m.ProvidersModule)
      },
      {
        path: 'insurance',
        data: {
          title: 'Insurance',
          roles: ['billing-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/Insurance/insurance.module').then((m) => m.InsuranceModule)
      },
      {
        path: 'invoice',
        data: {
          title: 'Invoice',
          roles: ['billing-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/invoice/invoice.module').then((m) => m.InvoiceModule)
      },
      {
        path: 'cms/filing',
        data: {
          title: 'CMS-Filing',
          roles: ['filing-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/cms.filing/cms-filing.module').then((m) => m.CmsFilingModule)
      },

      {
        path: 'posting',
        data: {
          title: 'Posting',
          roles: ['payment-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/post/posting.module').then((m) => m.PostingModule)
      },
      {
        path: 'tools',
        data: {
          title: 'Tools',
          roles: ['billing-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/tools/tools.module').then((m) => m.ToolsModule)
      },
      {
        path: 'admin/tools',
        data: {
          title: 'Admin Tools',
          roles: ['admin-tool-role']
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/admin.tools/admin-tools.module').then((m) => m.AdminToolsModule)

      }
    ]
  },
  {
    path: '',
    component: SimulatorLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'simulator',
        loadChildren: () =>
          import('./modules/simulator/simulator.module').then((m) => m.SimulatorModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
