import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreateOrganizationComponent } from './component/organization/create/create.organization.component';
import { ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, SharedModule, TableModule } from '@coreui/angular-pro';
import { ModelModule } from '../model/model.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IconModule } from '@coreui/icons-angular';
import { BillingInfoComponent } from './component/billing.info/billing.info.component';
import { FacilityInfoComponent } from './component/facility/facility.info.component';
import { UserInfoComponent } from './component/user/user.info.component';


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    BillingInfoComponent,
    FacilityInfoComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ModelModule,
    FormModule,
    SharedModule,
    GridModule,
    CardModule,
    IconModule,
    ButtonModule,
    TableModule,
    ButtonGroupModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class AdministrationModule { }
