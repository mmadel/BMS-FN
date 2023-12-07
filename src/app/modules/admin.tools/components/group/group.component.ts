import { Component, OnInit, ViewChild } from '@angular/core';
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
    if (event === 'close') {
      this.addFacilityVisibility = false;
      this.listclinicsComponent.find();
    }
  }
}
