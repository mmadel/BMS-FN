import { Component, Input, OnInit } from '@angular/core';
import { InsuranceCompanyConfigurationEmitterService } from 'src/app/modules/Insurance/service/emitting/insurance-company-configuration-emitter.service';
import { Organization } from 'src/app/modules/model/admin/organiztion';

@Component({
  selector: 'edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  @Input() organization: Organization
  constructor(private insuranceCompanyConfigurationEmitterService:InsuranceCompanyConfigurationEmitterService) { }

  ngOnInit(): void {
  }
  edit() {
    this.insuranceCompanyConfigurationEmitterService.updatedBillingProvider$.next(this.organization)
  }

}
