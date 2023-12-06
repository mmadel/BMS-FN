import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./modules/patient/patient.module').then((m) => m.PatientModule)
      },
      {
        path: 'provider',
        loadChildren: () =>
          import('./modules/providers/providers.module').then((m) => m.ProvidersModule)
      },
      {
        path: 'insurance',
        loadChildren: () =>
          import('./modules/Insurance/insurance.module').then((m) => m.InsuranceModule)
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./modules/invoice/invoice.module').then((m) => m.InvoiceModule)
      },
      {
        path: 'posting',
        loadChildren: () =>
          import('./modules/post/posting.module').then((m) => m.PostingModule)
      },
      {
        path: 'tools',
        loadChildren: () =>
          import('./modules/tools/tools.module').then((m) => m.ToolsModule)
      },
      {
        path:'admin',
        loadChildren: () =>
          import('./modules/admin.tools/admin-tools.module').then((m) => m.AdminToolsModule)

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
