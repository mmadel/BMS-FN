import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/modules/admin.tools/services/organization.service';
import { Organization } from 'src/app/modules/model/admin/organiztion';

@Component({
  selector: 'app-box33-settings',
  templateUrl: './box33-settings.component.html',
  styleUrls: ['./box33-settings.component.scss']
})
export class Box33SettingsComponent implements OnInit {
  constructor(private organizationService: OrganizationService) { }
  defualtBillingProvider!: Organization;
  changeProviderVisible: boolean = false;
  ngOnInit(): void {
    this.organizationService.findDefaultOrganization()
      .subscribe((result) => {
        this.defualtBillingProvider = result;
      })
  }
  onChangeDefualtBillingProvider() {
    this.changeProviderVisible = true;
  }
  toggleChangeProviderVisible() {
    this.changeProviderVisible = !this.changeProviderVisible;
  }
}
