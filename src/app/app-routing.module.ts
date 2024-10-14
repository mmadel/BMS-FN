import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationLayoutComponent } from './administration.layout/administration.layout.component';
import { SimulatorLayoutComponent } from './availity.simulator/simulator-layout.component';
import { DefaultLayoutComponent } from './core';
import { ErrorComponent } from './core/error/error.component';
import { KcAuthGuard } from './modules/secuirty/guard/kc-auth.guard';
import { Role } from './modules/secuirty/model/roles';

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
          roles: [Role.PATIENT_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/patient/patient.module').then((m) => m.PatientModule)
      },
      {
        path: 'provider',
        data: {
          title: 'Provider',
          roles: [Role.PROVIDER_ROLE, Role.REFERRING_PROVIDER_ROLE, Role.SOLID_PROVIDER_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/providers/providers.module').then((m) => m.ProvidersModule)
      },
      {
        path: 'insurance',
        data: {
          title: 'Insurance',
          roles: [Role.BILLING_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/Insurance/insurance.module').then((m) => m.InsuranceModule)
      },
      {
        path: 'invoice',
        data: {
          title: 'Invoice',
          roles: [Role.BILLING_ROLE, Role.INVOICE_BILLING_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/invoice/invoice.module').then((m) => m.InvoiceModule)
      },
      {
        path: 'cms/filing',
        data: {
          title: 'CMS-Filing',
          roles: [Role.FILING_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/cms.filing/cms-filing.module').then((m) => m.CmsFilingModule)
      },

      {
        path: 'posting',
        data: {
          title: 'Posting',
          roles: [Role.PAYMENT_ROLE, Role.BATCH_INSURANCE_PAYMENT_ROLE, Role.BATCH_CLIENT_PAYMENT_ROLE, Role.BALANCE_STATEMENT_PAYMENT_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/post/posting.module').then((m) => m.PostingModule)
      },
      {
        path: 'tools',
        data: {
          title: 'Tools',
          roles: [Role.BILLING_ROLE, Role.FEE_SCHEDULE_BILLING_ROLE, Role.MODIFIER_RULE_BILLING_ROLE]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/tools/tools.module').then((m) => m.ToolsModule)
      },
      {
        path: 'admin/tools',
        data: {
          title: 'Admin Tools',
          roles: [Role.ADMIN_TOOL_ROLE, Role.GROUP_INFO_ADMIN_TOOL_ROLE, Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE, Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE, Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE]
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
  {
    path: 'error',
    component: ErrorComponent
  }
  , {
    path: '',
    component: AdministrationLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'setup',
        data: {
          title: 'setup',
          roles: [Role.ADMIN]
        },
        canActivate: [KcAuthGuard],
        loadChildren: () =>
          import('./modules/administration/administration.module').then((m) => m.AdministrationModule)
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
