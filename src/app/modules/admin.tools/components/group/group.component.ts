import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { ClinicsComponent } from '../clinics/clinics.component';
import { OrganizationComponent } from '../organization/organization.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild('organizationComponent') organizationComponent: OrganizationComponent;
  @ViewChild('listclinicsComponent') listclinicsComponent: ClinicsComponent;
  editProviderVisibility: boolean = false;
  addFacilityVisibility: boolean = false;
  componentRole: string[] = [Role.ADMIN_TOOL_ROLE, Role.GROUP_INFO_ADMIN_TOOL_ROLE];
  constructor() { }

  ngOnInit(): void {
  }
  toggleEditProvider() {
    this.editProviderVisibility = !this.editProviderVisibility;
  }
  toggleAddFacility() {
    this.addFacilityVisibility = !this.addFacilityVisibility;
  }
  
  onClickEditProviderInformation() {
    this.editProviderVisibility = true;
  }
  onClickAddFacility() {
    this.addFacilityVisibility = true;
  }
  changeProviderVisibility(event: any) {
    if (event === 'close') {
      this.editProviderVisibility = false;
      this.organizationComponent.find()
    }
  }
  changeAddFacilityVisibility(event: any) {
    if (event === 'create') {
      this.addFacilityVisibility = false;
      this.listclinicsComponent.find();
    }
  }
}
